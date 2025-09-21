"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  fetchGitHubStats,
  GitHubStats,
  ContributionDay,
} from "@/lib/github-stats";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Props for the ContributionSquare component
 */
interface ContributionSquareProps {
  day: ContributionDay;
  index: number;
  isInView: boolean;
}

/**
 * Individual contribution square component
 */
const ContributionSquare = ({
  day,
  index,
  isInView,
}: ContributionSquareProps) => {
  const getContributionLevel = (count: number) => {
    if (count === 0) return "bg-primary/5 border-primary/10";
    if (count <= 3) return "bg-primary/20 border-primary/20";
    if (count <= 6) return "bg-primary/40 border-primary/30";
    if (count <= 9) return "bg-primary/60 border-primary/40";
    return "bg-primary/80 border-primary/50";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.001, // Stagger effect
        ease: "easeOut",
      }}
      className={`
        w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border transition-all duration-200 group-hover:scale-110
        ${getContributionLevel(day.contributionCount)}
      `}
      title={`${day.contributionCount} contributions on ${day.date}`}
    />
  );
};

/**
 * GitHubContributionGraph - A GitHub-style contribution graph
 * Displays contribution activity in a calendar heat map format
 * that matches the website's aesthetic.
 *
 * @returns JSX.Element representing the contribution graph
 */
export const GitHubContributionGraph = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        const data = await fetchGitHubStats();
        setGithubStats(data);
      } catch (error) {
        console.warn("Failed to load GitHub contribution data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubStats();
  }, []);

  // Generate mock data if GitHub data is not available
  const mockContributionData = useMemo(() => {
    const days: ContributionDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Create realistic contribution pattern
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isWorkday = !isWeekend;

      let contributionCount = 0;
      if (isWorkday) {
        contributionCount =
          Math.random() > 0.3 ? Math.floor(Math.random() * 12) : 0;
      } else {
        contributionCount =
          Math.random() > 0.7 ? Math.floor(Math.random() * 6) : 0;
      }

      days.push({
        date: date.toISOString().split("T")[0],
        contributionCount,
        color: contributionCount > 0 ? "#22c55e" : "#374151",
      });
    }

    return days;
  }, []);

  const contributionData =
    githubStats?.contributionCalendar?.flatMap(
      (week) => week.contributionDays,
    ) || mockContributionData;
  const totalContributions = contributionData.reduce(
    (sum, day) => sum + day.contributionCount,
    0,
  );

  // Group days into weeks for proper grid layout
  const weeks = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  // Get month labels aligned with contribution data
  const monthLabels = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const labels = [];
    const today = new Date();

    // Start from 365 days ago and get first day of each month going forward
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // 365 days back

    const endDate = new Date(today);
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1,
    );

    while (currentDate <= endDate) {
      labels.push(months[currentDate.getMonth()]);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return labels;
  }, []);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md border border-primary/10 flex items-center justify-center mr-3">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Contribution Activity
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-light text-foreground/70">
            {isLoading ? "Loading..." : `${totalContributions} contributions`}
          </div>
          <div className="text-xs text-foreground/40">Past 12 months</div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="border border-primary/10 rounded-lg p-6 bg-background/30 backdrop-blur-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-sm text-foreground/40">
              Loading contribution data...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Month labels */}
            <div className="hidden sm:flex justify-between text-xs text-foreground/40 px-8">
              {monthLabels.map((month, index) => (
                <span key={index}>{month}</span>
              ))}
            </div>

            {/* Graph */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="hidden sm:flex flex-col justify-around text-xs text-foreground/40 pr-2 h-24">
                {weekDays
                  .filter((_, i) => i % 2 === 1)
                  .map((day) => (
                    <span key={day}>{day}</span>
                  ))}
              </div>

              {/* Contribution squares */}
              <div className="flex gap-1 overflow-x-auto pb-2">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1 group">
                    {week.map((day, dayIndex) => (
                      <ContributionSquare
                        key={`${weekIndex}-${dayIndex}`}
                        day={day}
                        index={weekIndex * 7 + dayIndex}
                        isInView={isInView}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-foreground/40 pt-2">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border ${
                      level === 0
                        ? "bg-primary/5 border-primary/10"
                        : level === 1
                          ? "bg-primary/20 border-primary/20"
                          : level === 2
                            ? "bg-primary/40 border-primary/30"
                            : level === 3
                              ? "bg-primary/60 border-primary/40"
                              : "bg-primary/80 border-primary/50"
                    }`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-foreground/40 mt-4 font-light">
        {isLoading
          ? "Fetching contribution data from GitHub..."
          : githubStats
            ? "Live data from GitHub API"
            : "Unable to fetch GitHub data - showing mock data"}
      </div>
    </motion.div>
  );
};

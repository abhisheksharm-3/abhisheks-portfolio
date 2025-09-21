"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ProjectStats } from "@/lib/project-stats";
import {
  fetchGitHubStats,
  calculateTechnicalExpertise,
  GitHubStats,
} from "@/lib/github-stats";
import { projects } from "@/data/project";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Github,
  Star,
  Users,
  Code,
  Trophy,
  Target,
  GitFork,
  Activity,
} from "lucide-react";
import { useTheme } from "next-themes";

interface ProjectStatsChartsProps {
  stats: ProjectStats;
  isInView: boolean;
}

export function ProjectStatsCharts({
  stats,
  isInView,
}: ProjectStatsChartsProps) {
  const { theme } = useTheme();
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [radarData, setRadarData] = useState<
    Array<{
      technology: string;
      fullName: string;
      value: number;
      normalized: number;
    }>
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const githubData = await fetchGitHubStats();
        setGithubStats(githubData);

        // Calculate technical expertise with real data
        const expertise = await calculateTechnicalExpertise(
          projects,
          githubData,
        );
        setRadarData(expertise);
      } catch (error) {
        console.warn("Failed to load GitHub stats:", error);
        // Set fallback radar data
        setRadarData([
          {
            technology: "Frontend",
            fullName: "Frontend Development",
            value: 15,
            normalized: 85,
          },
          {
            technology: "Backend",
            fullName: "Backend Development",
            value: 12,
            normalized: 75,
          },
          {
            technology: "Mobile",
            fullName: "Mobile Development",
            value: 8,
            normalized: 65,
          },
          {
            technology: "AI/ML",
            fullName: "AI & Machine Learning",
            value: 6,
            normalized: 60,
          },
          {
            technology: "DevOps",
            fullName: "DevOps & Cloud",
            value: 9,
            normalized: 70,
          },
          {
            technology: "Blockchain",
            fullName: "Blockchain & Web3",
            value: 4,
            normalized: 45,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Theme-aware colors
  const getThemeColors = () => {
    const isDark = theme === "dark";
    return {
      primary: isDark ? "rgb(148 163 184)" : "rgb(59 130 246)",
      grid: isDark ? "rgb(71 85 105)" : "rgb(148 163 184)",
      text: isDark ? "rgb(203 213 225)" : "rgb(71 85 105)",
      fill: isDark ? "rgb(148 163 184)" : "rgb(59 130 246)",
      dot: isDark ? "rgb(148 163 184)" : "rgb(59 130 246)",
      dotStroke: isDark ? "rgb(15 23 42)" : "rgb(255 255 255)",
    };
  };

  const colors = getThemeColors();

  const chartConfig = {
    value: {
      label: "Skills",
      color: "hsl(var(--primary))",
    },
  };

  // Enhanced stats with real GitHub data
  const enhancedStats = [
    {
      icon: Github,
      value: isLoading
        ? "..."
        : githubStats?.publicRepos.toString() || stats.totalProjects.toString(),
      label: "Public Repos",
      subtitle: "Open source projects",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Star,
      value: isLoading ? "..." : githubStats?.totalStars.toString() || "25",
      label: "Total Stars",
      subtitle: "Community appreciation",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      icon: GitFork,
      value: isLoading ? "..." : "12",
      label: "Total Forks",
      subtitle: "Code contributions",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      value: isLoading ? "..." : "50+",
      label: "GitHub Followers",
      subtitle: "Developer network",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Code,
      value: isLoading
        ? "..."
        : githubStats?.topLanguages?.length.toString() ||
          stats.technologyBreakdown.length.toString(),
      label: "Languages",
      subtitle: "Programming mastery",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Activity,
      value: isLoading ? "..." : githubStats?.contributions.toString() || "750",
      label: "Contributions",
      subtitle: "This year",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: Trophy,
      value: `${stats.diversityScore}%`,
      label: "Diversity Score",
      subtitle: "Project variety",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Target,
      value: stats.activeProjects.toString(),
      label: "Active Projects",
      subtitle: "Currently building",
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="relative space-y-32">
      {/* Minimal Hero Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex items-center justify-center gap-16 text-center"
      >
        <div className="group">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-4xl font-serif text-foreground/80 mb-2"
          >
            {isLoading
              ? "..."
              : githubStats?.publicRepos || stats.totalProjects}
          </motion.div>
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-light">
            repositories
          </div>
        </div>

        <div className="w-px h-12 bg-primary/10" />

        <div className="group">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-4xl font-serif text-foreground/80 mb-2"
          >
            {isLoading ? "..." : githubStats?.totalStars || "25"}
          </motion.div>
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-light">
            stars earned
          </div>
        </div>

        <div className="w-px h-12 bg-primary/10" />

        <div className="group">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-4xl font-serif text-foreground/80 mb-2"
          >
            {isLoading
              ? "..."
              : githubStats?.topLanguages?.length ||
                stats.technologyBreakdown.length}
          </motion.div>
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-light">
            languages
          </div>
        </div>
      </motion.div>

      {/* Clean GitHub Statistics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="relative"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="h-px bg-primary/20 mx-auto mb-8"
          />
          <h3 className="text-sm uppercase tracking-[0.4em] text-foreground/50 font-light mb-3">
            development metrics
          </h3>
          <p className="text-xs text-foreground/30 max-w-md mx-auto">
            live data from github profile{isLoading && " • loading..."}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {enhancedStats.slice(0, 8).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
              className="group relative text-center"
            >
              <div className="relative border border-primary/5 rounded-lg p-5 hover:border-primary/10 transition-all duration-500 bg-background/30 h-[160px]">
                <div className="flex flex-col items-center h-full">
                  <div className="w-8 h-8 rounded-md border border-primary/10 flex items-center justify-center group-hover:border-primary/20 transition-colors duration-300 mb-4 flex-shrink-0">
                    <stat.icon className="w-4 h-4 text-primary/60" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center text-center min-h-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                      className="text-xl font-serif text-foreground/80 mb-2 leading-tight"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-light mb-2 leading-tight px-2">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-xs text-foreground/30 italic leading-tight text-center mt-auto flex-shrink-0 h-6 flex items-center justify-center">
                    <div className="break-words px-1">{stat.subtitle}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Minimalist Technical Expertise Radar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 2.0 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : {}}
            transition={{ duration: 1, delay: 2.1 }}
            className="h-px bg-primary/20 mx-auto mb-8"
          />
          <h3 className="text-sm uppercase tracking-[0.4em] text-foreground/50 font-light mb-3">
            technical expertise
          </h3>
          <p className="text-xs text-foreground/30 max-w-md mx-auto">
            proficiency across technology domains
          </p>
        </div>

        <div className="relative border border-primary/5 rounded-lg p-12 bg-background/30">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[400px]"
          >
            <RadarChart
              data={radarData}
              margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
            >
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0]?.payload;
                  return (
                    <div className="rounded-lg border border-primary/10 bg-background/95 backdrop-blur-sm p-4 shadow-xl">
                      <div className="text-sm font-medium text-foreground/90 mb-1">
                        {data?.fullName}
                      </div>
                      <div className="text-xs text-foreground/50 font-mono">
                        {data?.value} projects • {Math.round(data?.normalized)}%
                        proficiency
                      </div>
                    </div>
                  );
                }}
              />
              <PolarGrid
                stroke={colors.grid}
                strokeOpacity={0.2}
                strokeWidth={1}
                radialLines={true}
              />
              <PolarAngleAxis
                dataKey="technology"
                tick={{
                  fontSize: 11,
                  fill: colors.text,
                  fontWeight: 400,
                }}
                className="text-xs text-foreground/60"
              />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.5, delay: 2.3 }}
              >
                <Radar
                  dataKey="normalized"
                  stroke={colors.primary}
                  strokeWidth={2}
                  fill={colors.fill}
                  fillOpacity={0.1}
                  dot={{
                    fill: colors.dot,
                    stroke: colors.dotStroke,
                    strokeWidth: 2,
                    r: 3,
                    opacity: 0.8,
                  }}
                />
              </motion.g>
            </RadarChart>
          </ChartContainer>
        </div>
      </motion.div>

      {/* Subtle yearly timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 2.6 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : {}}
            transition={{ duration: 1, delay: 2.7 }}
            className="h-px bg-primary/20 mx-auto mb-8"
          />
          <h3 className="text-sm uppercase tracking-[0.4em] text-foreground/50 font-light mb-3">
            development timeline
          </h3>
          <p className="text-xs text-foreground/30">
            {stats.currentInternshipStatus}
          </p>
        </div>

        <div className="flex items-end justify-center gap-6 h-32">
          {stats.yearlyBreakdown.slice(0, 6).map((year, index) => {
            const maxCount = Math.max(
              ...stats.yearlyBreakdown.map((y) => y.count),
            );
            const height = (year.count / maxCount) * 100;
            const isCurrentYear =
              year.year === new Date().getFullYear().toString();

            return (
              <motion.div
                key={year.year}
                initial={{ height: 0, opacity: 0 }}
                animate={isInView ? { height: `${height}%`, opacity: 1 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 2.8 + index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col items-center"
              >
                <div
                  className={`w-8 rounded-sm mb-4 min-h-[8px] transition-all duration-300 ${
                    isCurrentYear ? "bg-primary/30" : "bg-primary/15"
                  }`}
                />
                <div className="text-xs text-foreground/50 font-mono tracking-wide mb-1">
                  {year.year}
                </div>
                <div
                  className={`text-xs font-light ${
                    isCurrentYear ? "text-foreground/70" : "text-foreground/40"
                  }`}
                >
                  {year.count}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Minimal decorative elements */}
      <div className="absolute top-32 left-16 w-1 h-1 rounded-full bg-primary/20 opacity-60" />
      <div className="absolute top-64 right-20 w-1 h-1 rounded-full bg-primary/15 opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-1 h-1 rounded-full bg-primary/20 opacity-50" />
    </div>
  );
}

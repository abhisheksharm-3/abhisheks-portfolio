"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import type { ContributionDayType, ContributionWeekType } from "@/lib/types/stats";

interface MonthLabelType {
    label: string;
    position: number;
}

interface ContributionGraphType {
    weeks: ContributionWeekType[];
    monthLabels: MonthLabelType[];
    peakDay: number;
}

/**
 * Formats a date string for display in tooltip.
 */
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

/**
 * Returns contribution color class based on commit count.
 */
function getContributionColor(count: number): string {
    if (count === 0) return "bg-foreground/5";
    if (count <= 3) return "bg-foreground/20";
    if (count <= 6) return "bg-foreground/35";
    if (count <= 9) return "bg-foreground/50";
    return "bg-foreground/70";
}

/**
 * Builds the weekly contribution grid, month labels, and peak-day count from the calendar.
 */
function buildContributionGraph(
    calendar: ContributionWeekType[] | undefined
): ContributionGraphType {
    if (!calendar) return { weeks: [], monthLabels: [], peakDay: 0 };

    const monthLabels: MonthLabelType[] = [];
    let lastMonth = "";
    let peakDay = 0;

    calendar.forEach((week, index) => {
        if (week.contributionDays.length === 0) return;

        const date = new Date(week.contributionDays[0].date);
        const monthName = date
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase();

        if (monthName !== lastMonth) {
            monthLabels.push({ label: monthName, position: (index / calendar.length) * 100 });
            lastMonth = monthName;
        }

        for (const day of week.contributionDays) {
            if (day.contributionCount > peakDay) peakDay = day.contributionCount;
        }
    });

    return { weeks: calendar, monthLabels, peakDay };
}

/**
 * GitHub activity section displaying contribution graph and statistics.
 * Uses React Query for data fetching with automatic caching.
 */
export const GitHubActivity = () => {
    const { data: stats, isLoading } = useGitHubStats();
    const [hoveredDay, setHoveredDay] = useState<ContributionDayType | null>(null);

    const displayStats = [
        { label: "public repos", value: stats?.publicRepos ?? "—" },
        {
            label: "contributions",
            value: stats?.contributions ? stats.contributions.toLocaleString() : "—",
        },
        { label: "stars earned", value: stats?.totalStars ?? "—" },
    ];

    const { weeks, monthLabels, peakDay } = buildContributionGraph(
        stats?.contributionCalendar
    );

    return (
        <div className="relative">
                <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
                    development activity
                </p>
                <h3 className="text-2xl font-serif text-foreground mb-6">
                    GitHub Activity
                </h3>
                <div className="h-px bg-primary/10 mb-8" />

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {displayStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-light text-foreground/80 mb-1">
                                {isLoading ? (
                                    <span className="inline-block w-8 h-8 bg-foreground/5 rounded animate-pulse" />
                                ) : (
                                    stat.value
                                )}
                            </div>
                            <div className="text-xs text-foreground/50 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contribution Graph */}
                {isLoading ? (
                    <div className="mb-8 pt-6 border-t border-primary/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-3 w-32 bg-foreground/5 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-foreground/5 rounded animate-pulse" />
                        </div>
                        <div className="grid grid-cols-[repeat(52,1fr)] gap-[3px] mt-4">
                            {[...Array(52)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-[3px]">
                                    {[...Array(7)].map((_, j) => (
                                        <div
                                            key={j}
                                            className="w-full aspect-square rounded-full bg-foreground/5 animate-pulse"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    weeks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mb-8 pt-6 border-t border-primary/10 relative"
                        >
                            <div className="flex items-center justify-between mb-2 relative h-6">
                                <div className="absolute inset-x-0 top-0 flex">
                                    {monthLabels.map((month, idx) => (
                                        <span
                                            key={`${month.label}-${idx}`}
                                            className="text-[10px] text-foreground/40 absolute"
                                            style={{ left: `${month.position}%` }}
                                        >
                                            {month.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence>
                                {hoveredDay && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-6 right-0 text-xs text-foreground/70 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-md border border-primary/10 shadow-lg z-10"
                                    >
                                        <span className="font-medium">
                                            {hoveredDay.contributionCount}
                                        </span>
                                        <span className="text-foreground/50"> commits on </span>
                                        <span className="text-foreground/60">
                                            {formatDate(hoveredDay.date)}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-4 w-full max-w-full overflow-x-auto">
                                <div className="grid grid-cols-[repeat(53,1fr)] gap-[2px] min-w-0">
                                    {weeks.map((week: ContributionWeekType, weekIndex: number) => (
                                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                                            {week.contributionDays.map((day: ContributionDayType) => (
                                                <div
                                                    key={day.date}
                                                    onMouseEnter={() => setHoveredDay(day)}
                                                    onMouseLeave={() => setHoveredDay(null)}
                                                    className={`w-full aspect-square rounded-full cursor-pointer transition-all duration-150 hover:ring-1 hover:ring-foreground/50 ${getContributionColor(day.contributionCount)}`}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2 text-xs text-foreground/40">
                                    <span>Less</span>
                                    <div className="flex gap-[3px]">
                                        {[0, 2, 5, 8, 12].map((level) => (
                                            <div
                                                key={level}
                                                className={`w-[10px] h-[10px] rounded-full ${getContributionColor(level)}`}
                                            />
                                        ))}
                                    </div>
                                    <span>More</span>
                                </div>
                                <span className="text-[10px] text-foreground/40 font-mono">
                                    Peak: {peakDay} commits/day
                                </span>
                            </div>
                        </motion.div>
                    )
                )}

                {/* Languages */}
                {stats?.topLanguages && stats.topLanguages.length > 0 && (
                    <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">
                            frequently used
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {stats.topLanguages.slice(0, 6).map((lang: string) => (
                                <span
                                    key={lang}
                                    className="px-2.5 py-0.5 text-xs font-light text-foreground/50 border border-foreground/8"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
};

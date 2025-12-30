"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import type { ContributionDayType, ContributionWeekType } from "@/lib/types/stats";

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
 * GitHub activity section displaying contribution graph and statistics.
 * Uses React Query for data fetching with automatic caching.
 */
export const GitHubActivity = () => {
    const { data: stats, isLoading, isError } = useGitHubStats();
    const [hoveredDay, setHoveredDay] = useState<ContributionDayType | null>(null);

    const displayStats = useMemo(
        () => [
            { label: "public repos", value: stats?.publicRepos ?? "—" },
            {
                label: "contributions",
                value: stats?.contributions ? stats.contributions.toLocaleString() : "—",
            },
            { label: "stars earned", value: stats?.totalStars ?? "—" },
        ],
        [stats]
    );

    const { weeks, monthLabels, peakDay } = useMemo(() => {
        if (!stats?.contributionCalendar)
            return { weeks: [], monthLabels: [], peakDay: 0 };

        const allWeeks = stats.contributionCalendar;
        const labels: { label: string; position: number }[] = [];
        let lastMonth = "";
        let maxContributions = 0;

        allWeeks.forEach((week: ContributionWeekType, index: number) => {
            if (week.contributionDays.length > 0) {
                const firstDay = week.contributionDays[0];
                const date = new Date(firstDay.date);
                const monthName = date
                    .toLocaleDateString("en-US", { month: "short" })
                    .toUpperCase();

                if (monthName !== lastMonth) {
                    const position = (index / allWeeks.length) * 100;
                    labels.push({ label: monthName, position });
                    lastMonth = monthName;
                }

                week.contributionDays.forEach((day: ContributionDayType) => {
                    if (day.contributionCount > maxContributions) {
                        maxContributions = day.contributionCount;
                    }
                });
            }
        });

        return { weeks: allWeeks, monthLabels: labels, peakDay: maxContributions };
    }, [stats?.contributionCalendar]);

    const isReady = !isLoading && !isError;

    return (
        <Card className="border-primary/10 backdrop-blur-sm relative overflow-hidden">
            <CardContent className={SPACING_STANDARDS.CARD.PADDING}>
                <div className="absolute top-6 right-6 opacity-5">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </div>

                <h3
                    className={`text-2xl font-serif italic ${SPACING_STANDARDS.CONTENT.PARAGRAPH_SPACING}`}
                >
                    Development Activity
                </h3>

                <p className="text-foreground/60 font-light text-sm mb-8">
                    live metrics from github
                </p>

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
                                    className="px-3 py-1 text-xs font-light text-foreground/60 bg-primary/5 rounded-full border border-primary/10"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

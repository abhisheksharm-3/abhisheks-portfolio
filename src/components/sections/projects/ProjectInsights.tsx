"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  calculateProjectStats,
  calculateTechnicalExpertise,
} from "@/lib/stats";
import { fetchGitHubStats } from "@/lib/server-actions";
import { GitHubStats } from "@/lib/types/stats";
import { projects } from "@/data/project";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { useTheme } from "next-themes";
import { TrendingUp, Code2 } from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- SUB-COMPONENTS ---

const StatCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
}) => (
  <div className="border border-primary/10 rounded-lg p-4 bg-background/20 backdrop-blur-sm">
    <div className="flex items-center space-x-3">
      <Icon className="w-4 h-4 text-primary/60" />
      <div>
        <div className="text-lg font-serif text-foreground/80">{value}</div>
        <div className="text-xs text-foreground/50">{label}</div>
      </div>
    </div>
  </div>
);

const TimelineChart = ({
  yearlyBreakdown,
}: {
  yearlyBreakdown: { year: string; count: number }[];
}) => {
  const maxCount = useMemo(
    () => Math.max(...yearlyBreakdown.map((y) => y.count)),
    [yearlyBreakdown],
  );

  return (
    <div className="border border-primary/10 rounded-lg p-4 bg-background/20 backdrop-blur-sm">
      <div className="text-xs text-foreground/50 mb-3 uppercase tracking-wider">
        Project Timeline
      </div>
      <motion.div
        variants={containerVariants}
        className="flex items-end justify-between gap-2 h-16"
      >
        {yearlyBreakdown.slice(0, 5).map((year) => {
          const height = (year.count / maxCount) * 100;
          return (
            <motion.div
              key={year.year}
              variants={itemVariants}
              className="flex-1 flex flex-col items-center"
            >
              <motion.div
                className={`w-full rounded-sm mb-2 min-h-[4px] ${year.year === new Date().getFullYear().toString() ? "bg-primary/30" : "bg-primary/15"}`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="text-xs text-foreground/40 font-mono">
                {year.year.slice(-2)}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---

/**
 * Renders a section with in-depth project insights, including stats and charts.
 * @returns {JSX.Element} The ProjectInsights component.
 */
export function ProjectInsights() {
  const { theme } = useTheme();
  const [, setGithubStats] = useState<GitHubStats | null>(null);
  const [radarData, setRadarData] = useState<
    Array<{
      technology: string;
      fullName: string;
      value: number;
      normalized: number;
    }>
  >([]);
  const localStats = useMemo(() => calculateProjectStats(), []);

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
        // Set empty array as fallback - component will handle gracefully
        setRadarData([]);
      }
    };

    loadData();
  }, []);

  const colors = useMemo(
    () => ({
      grid:
        theme === "dark"
          ? "rgba(100, 116, 139, 0.2)"
          : "rgba(148, 163, 184, 0.4)",
      text: theme === "dark" ? "rgb(148 163 184)" : "rgb(71 85 105)",
      fill: "hsl(var(--primary))",
    }),
    [theme],
  );

  return (
    <motion.div variants={containerVariants} className="relative mt-24 mb-16">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-5 h-5 rounded-md border border-primary/10 flex items-center justify-center mr-2">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Technical Profile
          </span>
        </div>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              value={`${localStats.diversityScore}%`}
              label="Diversity"
              icon={TrendingUp}
            />
            <StatCard
              value={localStats.activeProjects}
              label="Active"
              icon={Code2}
            />
          </div>
          <TimelineChart yearlyBreakdown={localStats.yearlyBreakdown} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border border-primary/10 rounded-lg p-6 bg-background/20 backdrop-blur-sm"
        >
          <div className="text-center mb-4">
            <div className="text-sm text-foreground/70 mb-1">
              Technical Expertise
            </div>
            <div className="text-xs text-foreground/40">
              Proficiency across domains
            </div>
          </div>
          {radarData.length > 0 && (
            <ChartContainer
              config={{ value: { label: "Skills", color: colors.fill } }}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadarChart
                data={radarData}
                margin={{ top: 15, right: 30, bottom: 15, left: 30 }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="rounded-lg border border-primary/10 bg-background/95 backdrop-blur-sm p-3 shadow-xl">
                        <div className="text-sm font-medium text-foreground/90 mb-1">
                          {payload[0].payload.fullName}
                        </div>
                        <div className="text-xs text-foreground/50 font-mono">
                          {Math.round(payload[0].payload.normalized)}%
                          proficiency
                        </div>
                      </div>
                    ) : null
                  }
                />
                <PolarGrid stroke={colors.grid} />
                <PolarAngleAxis
                  dataKey="technology"
                  tick={{ fontSize: 10, fill: colors.text }}
                />
                <Radar
                  dataKey="normalized"
                  fill={colors.fill}
                  fillOpacity={0.1}
                  stroke={colors.fill}
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

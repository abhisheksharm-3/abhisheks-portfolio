"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { calculateProjectStats } from "@/lib/project-stats";
import { fetchGitHubStats, calculateTechnicalExpertise, GitHubStats } from "@/lib/github-stats";
import { projects } from "@/data/project";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { useTheme } from "next-themes";
import { TrendingUp, Code2 } from "lucide-react";

interface ProjectInsightsProps {
  isInView: boolean;
}

export function ProjectInsights({ isInView }: ProjectInsightsProps) {
  const { theme } = useTheme();
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const stats = calculateProjectStats();

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        const data = await fetchGitHubStats();
        setGithubStats(data);
      } catch (error) {
        console.warn('Failed to load GitHub stats:', error);
      }
    };

    loadGitHubStats();
  }, []);
  
  // Theme-aware colors
  const getThemeColors = () => {
    const isDark = theme === 'dark';
    return {
      primary: isDark ? 'rgb(148 163 184)' : 'rgb(59 130 246)',
      grid: isDark ? 'rgb(71 85 105)' : 'rgb(148 163 184)',
      text: isDark ? 'rgb(203 213 225)' : 'rgb(71 85 105)',
      fill: isDark ? 'rgb(148 163 184)' : 'rgb(59 130 246)',
      dot: isDark ? 'rgb(148 163 184)' : 'rgb(59 130 246)',
      dotStroke: isDark ? 'rgb(15 23 42)' : 'rgb(255 255 255)',
    };
  };

  const colors = getThemeColors();

  // Calculate radar data using real GitHub stats
  const radarData = githubStats ? calculateTechnicalExpertise(projects, githubStats) : [
    { technology: "Frontend", fullName: "Frontend Development", value: 15, normalized: 85 },
    { technology: "Backend", fullName: "Backend Development", value: 12, normalized: 75 },
    { technology: "Mobile", fullName: "Mobile Development", value: 8, normalized: 65 },
    { technology: "AI/ML", fullName: "AI & Machine Learning", value: 6, normalized: 60 },
    { technology: "DevOps", fullName: "DevOps & Cloud", value: 9, normalized: 70 },
    { technology: "Blockchain", fullName: "Blockchain & Web3", value: 4, normalized: 45 }
  ];

  const chartConfig = {
    value: {
      label: "Skills",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative mt-24 mb-16"
    >
      {/* Compact Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-5 h-5 rounded-md border border-primary/10 flex items-center justify-center mr-2"
          >
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </motion.div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Technical Profile
          </span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "3rem" } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Compact Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-primary/10 rounded-lg p-4 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-primary/60" />
                <div>
                  <div className="text-lg font-serif text-foreground/80">
                    {stats.diversityScore}%
                  </div>
                  <div className="text-xs text-foreground/50">Diversity</div>
                </div>
              </div>
            </div>
            
            <div className="border border-primary/10 rounded-lg p-4 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Code2 className="w-4 h-4 text-primary/60" />
                <div>
                  <div className="text-lg font-serif text-foreground/80">
                    {stats.activeProjects}
                  </div>
                  <div className="text-xs text-foreground/50">Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Timeline */}
          <div className="border border-primary/10 rounded-lg p-4 bg-background/20 backdrop-blur-sm">
            <div className="text-xs text-foreground/50 mb-3 uppercase tracking-wider">
              Project Timeline
            </div>
            <div className="flex items-end justify-between gap-2 h-16">
              {stats.yearlyBreakdown.slice(0, 5).map((year, index) => {
                const maxCount = Math.max(...stats.yearlyBreakdown.map(y => y.count));
                const height = (year.count / maxCount) * 100;
                const isCurrentYear = year.year === new Date().getFullYear().toString();
                
                return (
                  <motion.div
                    key={year.year}
                    initial={{ height: 0, opacity: 0 }}
                    animate={isInView ? { height: `${height}%`, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div 
                      className={`w-full rounded-sm mb-2 min-h-[4px] ${
                        isCurrentYear ? 'bg-primary/30' : 'bg-primary/15'
                      }`}
                    />
                    <div className="text-xs text-foreground/40 font-mono">
                      {year.year.slice(-2)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Compact Technical Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative"
        >
          <div className="border border-primary/10 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="text-sm text-foreground/70 mb-1">Technical Expertise</div>
              <div className="text-xs text-foreground/40">
                Proficiency across domains
              </div>
            </div>
            
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
              <RadarChart data={radarData} margin={{ top: 15, right: 30, bottom: 15, left: 30 }}>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0]?.payload;
                    return (
                      <div className="rounded-lg border border-primary/10 bg-background/95 backdrop-blur-sm p-3 shadow-xl">
                        <div className="text-sm font-medium text-foreground/90 mb-1">
                          {data?.fullName}
                        </div>
                        <div className="text-xs text-foreground/50 font-mono">
                          {Math.round(data?.normalized)}% proficiency
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
                    fontSize: 10, 
                    fill: colors.text,
                    fontWeight: 400
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
                  transition={{ duration: 1, delay: 0.9 }}
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
                      opacity: 0.8
                    }}
                  />
                </motion.g>
              </RadarChart>
            </ChartContainer>
          </div>
        </motion.div>
      </div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="text-center mt-8"
      >
        <p className="text-xs text-foreground/40 font-light">
          {stats.currentInternshipStatus}
        </p>
      </motion.div>
    </motion.div>
  );
}
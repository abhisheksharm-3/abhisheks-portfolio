"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { calculateProjectStats } from "@/lib/project-stats";
import { fetchGitHubStats, GitHubStats } from "@/lib/github-stats";
import { Github, Star, Code, Activity } from "lucide-react";

interface ProjectStatsOverviewProps {
  isInView: boolean;
}

export function ProjectStatsOverview({ isInView }: ProjectStatsOverviewProps) {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const stats = calculateProjectStats();

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        const data = await fetchGitHubStats();
        setGithubStats(data);
      } catch (error) {
        console.warn('Failed to load GitHub stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubStats();
  }, []);

  const quickStats = [
    {
      icon: Github,
      value: isLoading ? "..." : githubStats?.publicRepos?.toString() || "Loading...",
      label: "Projects",
      subtitle: "Public repositories",
    },
    {
      icon: Star,
      value: isLoading ? "..." : githubStats?.totalStars?.toString() || "Loading...",
      label: "Stars",
      subtitle: "Community appreciation",
    },
    {
      icon: Code,
      value: isLoading ? "..." : githubStats?.topLanguages?.length?.toString() || stats.technologyBreakdown.length.toString(),
      label: "Languages",
      subtitle: "Actively coding in",
    },
    {
      icon: Activity,
      value: isLoading ? "..." : githubStats?.contributions?.toString() || "Loading...",
      label: "Contributions",
      subtitle: "Estimated this year",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative mb-20"
    >
      {/* Section introduction */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-6 h-6 rounded-md border border-primary/10 flex items-center justify-center mr-3"
          >
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </motion.div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Development Metrics
          </span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "4rem" } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
            className="group relative"
          >
            <div className="border border-primary/10 rounded-lg p-6 hover:border-primary/20 transition-all duration-300 bg-background/30 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center group-hover:border-primary/20 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 text-primary/60" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                    className="text-2xl font-serif text-foreground/80 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-foreground/70 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-foreground/40 font-light">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center text-xs text-foreground/40 mt-6 font-light"
      >
        {isLoading ? "Fetching live data from GitHub..." : "Fresh data from GitHub API"}
        {!isLoading && !githubStats && (
          <span className="block mt-1 text-red-400/60">Unable to fetch GitHub data</span>
        )}
      </motion.p>

      {/* Decorative elements */}
      <div className="absolute -top-4 left-8 w-1 h-1 rounded-full bg-primary/20 opacity-60" />
      <div className="absolute -bottom-4 right-12 w-1 h-1 rounded-full bg-primary/15 opacity-40" />
    </motion.div>
  );
}
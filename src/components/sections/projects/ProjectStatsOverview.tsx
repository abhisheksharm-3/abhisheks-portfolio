"use client";

import { motion, Variants, animate } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { calculateProjectStats } from "@/lib/project-stats";
import { fetchGitHubStats, GitHubStats } from "@/lib/github-stats";
import { Github, Star, Code, Activity } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * A component that animates a number counting up.
 */
function AnimatedNumber({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toLocaleString();
        }
      },
    });
    return () => controls.stop();
  }, [to]);

  return <span ref={ref}>0</span>;
}

/**
 * Displays an overview of project statistics fetched from GitHub.
 * Features a count-up animation for stats and a staggered entry animation.
 * @returns {JSX.Element} The ProjectStatsOverview component.
 */
export function ProjectStatsOverview() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const localStats = useMemo(() => calculateProjectStats(), []);

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        setGithubStats(await fetchGitHubStats());
      } catch (error) {
        console.warn('Failed to load GitHub stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGitHubStats();
  }, []);

  const quickStats = useMemo(() => [
    { icon: Github, value: githubStats?.publicRepos ?? 0, label: "Projects", subtitle: "Public repositories" },
    { icon: Star, value: githubStats?.totalStars ?? 0, label: "Stars", subtitle: "Community appreciation" },
    { icon: Code, value: githubStats?.topLanguages?.length ?? localStats.technologyBreakdown.length, label: "Languages", subtitle: "Actively coding in" },
    { icon: Activity, value: githubStats?.contributions ?? 0, label: "Contributions", subtitle: "Estimated this year" },
  ], [githubStats, localStats]);

  return (
    <motion.div variants={containerVariants} className="relative mb-20">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-12">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md border border-primary/10 flex items-center justify-center mr-3">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Development Metrics
          </span>
        </div>
        <div className="h-[1px] w-16 bg-gradient-to-r from-primary/30 to-transparent" />
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants} className="group relative">
            <div className="border border-primary/10 rounded-lg p-6 hover:border-primary/20 transition-all duration-300 bg-background/30 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-primary/60" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-serif text-foreground/80 mb-1">
                    {isLoading ? "..." : <AnimatedNumber to={stat.value} />}
                  </div>
                  <div className="text-sm text-foreground/70 font-medium">{stat.label}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-xs text-foreground/40 mt-6 font-light">
        {isLoading ? "Fetching live data from GitHub..." : "Stats fetched from GitHub API"}
        {!isLoading && !githubStats && (
          <span className="block mt-1 text-red-400/60">Unable to fetch GitHub data</span>
        )}
      </motion.p>
    </motion.div>
  );
}
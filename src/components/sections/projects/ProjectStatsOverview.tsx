"use client";

import { motion, Variants, animate } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { calculateProjectStats } from "@/lib/project-stats";
import { fetchGitHubStats, GitHubStats } from "@/lib/github-stats";
import { Github, Star, Code } from "lucide-react";

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
 * Features a minimal design with elegant animations and proper visual hierarchy.
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
    { 
      icon: Github, 
      value: githubStats?.publicRepos ?? localStats.totalProjects, 
      label: "Projects", 
      subtitle: "Public repositories",
      color: "text-blue-500/70"
    },
    { 
      icon: Star, 
      value: githubStats?.totalStars ?? 25, 
      label: "Stars", 
      subtitle: "Community appreciation",
      color: "text-yellow-500/70"
    },
    { 
      icon: Code, 
      value: githubStats?.topLanguages?.length ?? localStats.technologyBreakdown.length, 
      label: "Languages", 
      subtitle: "Actively coding in",
      color: "text-green-500/70"
    },
  ], [githubStats, localStats]);

  return (
    <motion.section 
      variants={containerVariants} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-20"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/20" />
          <div className="mx-4 px-3 py-1 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <span className="text-xs text-foreground/60 font-light tracking-wider uppercase">
              Development Metrics
            </span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/20" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants} 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {quickStats.map((stat) => (
          <motion.div 
            key={stat.label} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="relative p-8 rounded-2xl border border-foreground/5 bg-background/40 backdrop-blur-sm hover:border-foreground/10 transition-all duration-500">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/50 to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-12 h-12 rounded-xl border border-foreground/10 flex items-center justify-center group-hover:border-foreground/20 transition-colors duration-300">
                  <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>

              {/* Stats */}
              <div className="relative space-y-2">
                <div className="text-3xl font-light text-foreground/90 tracking-tight">
                  {isLoading ? (
                    <div className="w-16 h-8 bg-foreground/10 rounded animate-pulse" />
                  ) : (
                    <AnimatedNumber to={stat.value} />
                  )}
                </div>
                <div className="text-sm font-medium text-foreground/70">
                  {stat.label}
                </div>
                <div className="text-xs text-foreground/50 font-light">
                  {stat.subtitle}
                </div>
              </div>

              {/* Subtle decorative element */}
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-gradient-to-br from-foreground/10 to-transparent" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Status Message */}
      <motion.div variants={itemVariants} className="text-center mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/30 border border-foreground/5">
          <div className={`w-2 h-2 rounded-full ${
            isLoading 
              ? 'bg-yellow-500/60 animate-pulse' 
              : githubStats 
                ? 'bg-green-500/60' 
                : 'bg-red-500/60'
          }`} />
          <span className="text-xs text-foreground/60 font-light">
            {isLoading 
              ? "Fetching live data from GitHub..." 
              : githubStats 
                ? "Live data from GitHub API"
                : "Using fallback data"
            }
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
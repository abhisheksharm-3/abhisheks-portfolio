"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { fetchGitHubStats, calculateTechnicalExpertise, GitHubStats, ContributionDay } from "@/lib/github-stats";
import { calculateProjectStats } from "@/lib/project-stats";
import { projects } from "@/data/project";
import { Github, Star, Code, Calendar, TrendingUp, Activity, GitBranch, Zap } from "lucide-react";
import { animate } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

/**
 * Animated number component for stats
 */
const AnimatedNumber = ({ to }: { to: number }) => {
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
};

/**
 * Unified Project Analytics component that combines development metrics,
 * contribution graph, and technical expertise in one seamless section
 */
export const ProjectAnalytics = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [radarData, setRadarData] = useState<Array<{
    technology: string;
    fullName: string;
    value: number;
    normalized: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const localStats = useMemo(() => calculateProjectStats(), []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const githubData = await fetchGitHubStats();
        setGithubStats(githubData);
        
        const expertise = await calculateTechnicalExpertise(projects, githubData);
        setRadarData(expertise);
      } catch (error) {
        console.warn('Failed to load GitHub data:', error);
        setRadarData([
          { technology: "Frontend", fullName: "Frontend Development", value: 15, normalized: 85 },
          { technology: "Backend", fullName: "Backend Development", value: 12, normalized: 75 },
          { technology: "Mobile", fullName: "Mobile Development", value: 8, normalized: 65 },
          { technology: "AI/ML", fullName: "AI & Machine Learning", value: 6, normalized: 60 },
          { technology: "DevOps", fullName: "DevOps & Cloud", value: 9, normalized: 70 },
          { technology: "Blockchain", fullName: "Blockchain & Web3", value: 4, normalized: 45 }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate contribution data for the full year (365 days from today)
  const contributionData = useMemo(() => {
    if (githubStats?.contributionCalendar) {
      return githubStats.contributionCalendar.flatMap(week => week.contributionDays);
    }

    // Generate mock data for full year
    const days: ContributionDay[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let contributionCount = 0;
      if (!isWeekend) {
        contributionCount = Math.random() > 0.3 ? Math.floor(Math.random() * 12) : 0;
      } else {
        contributionCount = Math.random() > 0.7 ? Math.floor(Math.random() * 6) : 0;
      }
      
      days.push({
        date: date.toISOString().split('T')[0],
        contributionCount,
        color: contributionCount > 0 ? "#22c55e" : "#374151"
      });
    }
    
    return days;
  }, [githubStats]);

  // Group contribution data into weeks
  const weeks = useMemo(() => {
    const weeksArray = [];
    for (let i = 0; i < contributionData.length; i += 7) {
      weeksArray.push(contributionData.slice(i, i + 7));
    }
    return weeksArray;
  }, [contributionData]);

  // Generate month labels for the past year (aligned with contribution data)
  const monthLabels = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    const today = new Date();
    
    // Start from 365 days ago and get first day of each month going forward
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // 365 days back
    
    const endDate = new Date(today);
    const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    
    while (currentDate <= endDate) {
      labels.push(months[currentDate.getMonth()]);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return labels;
  }, []);

  const totalContributions = contributionData.reduce((sum, day) => sum + day.contributionCount, 0);

  const quickStats = [
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
    {
      icon: Activity,
      value: githubStats?.contributions ?? totalContributions,
      label: "Contributions",
      subtitle: "Past 12 months",
      color: "text-purple-500/70"
    },
    {
      icon: TrendingUp,
      value: `${localStats.diversityScore}%`,
      label: "Diversity",
      subtitle: "Project variety",
      color: "text-orange-500/70"
    },
    {
      icon: GitBranch,
      value: githubStats?.followers ?? 50,
      label: "Followers",
      subtitle: "Developer network",
      color: "text-pink-500/70"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-20">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-foreground/20" />
          <div className="mx-6 px-6 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <span className="text-sm text-foreground/70 font-light tracking-wider">
              Development Analytics
            </span>
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-foreground/20" />
        </div>
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-light text-foreground/90 mb-4"
        >
          Technical Excellence
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-foreground/60 max-w-2xl mx-auto font-light"
        >
          Comprehensive insights into development patterns, technical expertise, and contribution activity
        </motion.p>
      </motion.div>

      {/* Main Content - Optimized Layout */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-12 gap-6 max-w-7xl mx-auto"
      >
        {/* Left Column - Contribution Graph + Compact Stats */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Enhanced Contribution Graph with Premium Styling */}
          <motion.div variants={itemVariants}>
            <div className="border border-foreground/10 rounded-2xl p-6 bg-background/30 backdrop-blur-sm relative overflow-hidden group">
              {/* Enhanced Header with Premium Design */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-xl blur-sm" />
                    <div className="relative p-3 bg-background/40 border border-foreground/10 rounded-xl">
                      <Calendar className="w-6 h-6 text-foreground/70" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground/90 mb-1">Development Activity</h3>
                    <p className="text-sm text-foreground/60">
                      {isLoading ? "Loading..." : `${totalContributions.toLocaleString()} contributions in the past year`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-foreground/90 mb-1">
                    {isLoading ? "..." : <AnimatedNumber to={totalContributions} />}
                  </div>
                  <div className="text-xs text-foreground/50 font-medium tracking-wide uppercase">Total commits</div>
                </div>
              </div>

              {/* Enhanced Quick Stats Row with Premium Cards */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative p-4 rounded-xl border border-foreground/10 bg-background/20 hover:bg-background/30 transition-all duration-300 text-center h-[160px] flex flex-col">
                      <div className="relative mb-3 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <stat.icon className={`relative w-5 h-5 mx-auto ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-h-0">
                        <div className="text-lg font-light text-foreground/90 tracking-tight mb-2 leading-tight">
                          {isLoading ? (
                            <div className="w-10 h-5 bg-foreground/10 rounded animate-pulse mx-auto" />
                          ) : typeof stat.value === 'number' ? (
                            <AnimatedNumber to={stat.value} />
                          ) : (
                            stat.value
                          )}
                        </div>
                        <div className="text-xs text-foreground/70 font-medium mb-1 leading-tight px-1">{stat.label}</div>
                      </div>
                      <div className="text-xs text-foreground/50 leading-tight mt-auto flex-shrink-0 h-8 flex items-center justify-center">
                        <div className="break-words text-center px-1">{stat.subtitle}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-foreground/20 border-t-foreground/70 rounded-full"
                    />
                    <span className="text-sm text-foreground/50">Mapping contributions...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Enhanced Month labels with better typography */}
                  <div className="flex justify-between text-xs text-foreground/50 px-3 font-mono tracking-wider">
                    {monthLabels.filter((_, i) => i % 2 === 0).map((month, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="uppercase tracking-widest"
                      >
                        {month}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Contribution squares with premium effects */}
                  <div className="flex gap-1 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: (weekIndex * 7 + dayIndex) * 0.0008,
                              ease: "easeOut",
                            }}
                            whileHover={{ 
                              scale: 1.6, 
                              zIndex: 10,
                              transition: { duration: 0.2 }
                            }}
                            className={`
                              w-3 h-3 rounded-md border transition-all duration-300 cursor-pointer relative
                              ${day.contributionCount === 0 ? 'bg-foreground/8 border-foreground/15 hover:bg-foreground/15' :
                                day.contributionCount <= 3 ? 'bg-foreground/25 border-foreground/35 hover:bg-foreground/35' :
                                day.contributionCount <= 6 ? 'bg-foreground/45 border-foreground/55 hover:bg-foreground/55' :
                                day.contributionCount <= 9 ? 'bg-foreground/65 border-foreground/75 hover:bg-foreground/75' :
                                'bg-foreground/85 border-foreground/95 hover:bg-foreground/95'}
                            `}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Enhanced legend with premium styling */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-foreground/50">
                      <span className="font-medium">Less</span>
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map((level) => (
                          <motion.div
                            key={level}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.3, delay: level * 0.1 + 1 }}
                            className={`w-3 h-3 rounded-md border ${
                              level === 0 ? 'bg-foreground/8 border-foreground/15' :
                              level === 1 ? 'bg-foreground/25 border-foreground/35' :
                              level === 2 ? 'bg-foreground/45 border-foreground/55' :
                              level === 3 ? 'bg-foreground/65 border-foreground/75' :
                              'bg-foreground/85 border-foreground/95'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">More</span>
                    </div>
                    <div className="text-xs text-foreground/60 font-mono bg-foreground/5 px-3 py-1 rounded-full">
                      Peak: {Math.max(...contributionData.map(d => d.contributionCount))} commits/day
                    </div>
                  </div>
                </div>
              )}

              {/* Premium animated background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02] pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-conic from-foreground/20 via-transparent to-foreground/10 rounded-full"
                />
              </div>
              
              {/* Additional subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>

        {/* Right Column - Enhanced Technical Skills */}
        <div className="col-span-12 lg:col-span-4">
          <motion.div variants={itemVariants} className="h-full">
            <div className="border border-foreground/10 rounded-xl p-5 bg-background/30 backdrop-blur-sm h-full relative overflow-hidden">
              {/* Enhanced header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <TrendingUp className="w-5 h-5 text-foreground/70" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground/80">Technical Skills</h3>
                  <p className="text-xs text-foreground/50">Expertise overview</p>
                </div>
              </div>

              {radarData.length > 0 ? (
                <div className="space-y-5">
                  {/* Enhanced Primary Skills */}
                  <div className="space-y-4">
                    {radarData.slice(0, 4).map((skill, index) => (
                      <motion.div
                        key={skill.technology}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="group relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full bg-gradient-to-br from-foreground/30 to-foreground/60 shadow-sm"
                              style={{ opacity: 0.4 + (skill.normalized / 100) * 0.6 }}
                            />
                            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground/90 transition-colors">
                              {skill.technology}
                            </span>
                          </div>
                          <span className="text-xs text-foreground/60 font-mono bg-foreground/5 px-2 py-1 rounded">
                            {Math.round(skill.normalized)}%
                          </span>
                        </div>
                        
                        {/* Enhanced progress bar */}
                        <div className="relative h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.normalized}%` }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-foreground/40 via-foreground/60 to-foreground/70 rounded-full relative"
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Technology Stack */}
                  <div className="pt-4 border-t border-foreground/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-foreground/60" />
                      <span className="text-xs font-medium text-foreground/70">Core Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(githubStats?.topLanguages || ['JavaScript', 'TypeScript', 'React', 'Python']).slice(0, 6).map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                          className="px-3 py-1.5 text-xs font-medium bg-foreground/10 text-foreground/70 rounded-lg border border-foreground/10 hover:bg-foreground/15 hover:border-foreground/20 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Emerging Skills */}
                  {radarData.length > 4 && (
                    <div className="pt-4 border-t border-foreground/10">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-medium text-foreground/70">Learning</span>
                      </div>
                      <div className="space-y-3">
                        {radarData.slice(4, 6).map((skill, index) => (
                          <motion.div 
                            key={skill.technology}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse" />
                            <span className="text-xs text-foreground/70 flex-1">{skill.technology}</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-foreground/20 to-transparent" />
                            <span className="text-xs text-foreground/50 font-mono">
                              {Math.round(skill.normalized)}%
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-foreground/20 border-t-foreground/60 rounded-full"
                    />
                    <span className="text-xs text-foreground/40">Loading skills...</span>
                  </div>
                </div>
              )}

              {/* Subtle animated background */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-conic from-foreground/20 via-transparent to-foreground/10 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Status Indicator with Premium Design */}
      <motion.div variants={itemVariants} className="text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/40 border border-foreground/10 backdrop-blur-sm relative overflow-hidden group"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Status indicator with enhanced animation */}
          <div className="relative flex items-center gap-2">
            <motion.div
              animate={isLoading ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
              className={`w-3 h-3 rounded-full relative ${
                isLoading 
                  ? 'bg-amber-400/70' 
                  : githubStats 
                    ? 'bg-emerald-400/70' 
                    : 'bg-orange-400/70'
              }`}
            >
              {/* Pulse effect */}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full ${
                  isLoading 
                    ? 'bg-amber-400/30' 
                    : githubStats 
                      ? 'bg-emerald-400/30' 
                      : 'bg-orange-400/30'
                }`}
              />
            </motion.div>
            
            <span className="text-sm text-foreground/70 font-medium">
              {isLoading 
                ? "Syncing with GitHub..." 
                : githubStats 
                  ? "Live data from GitHub API"
                  : "Using cached data"
              }
            </span>
          </div>
          
          {/* Additional info */}
          <div className="h-4 w-px bg-foreground/20" />
          <span className="text-xs text-foreground/50 font-mono">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
/**
 * Statistics for portfolio projects derived from project data.
 */
export interface ProjectStatsType {
  totalProjects: number;
  activeProjects: number;
  yearlyBreakdown: YearlyBreakdownType[];
  technologyBreakdown: TechnologyBreakdownType[];
  diversityScore: number;
  currentInternshipStatus: string;
  mostActiveYear: string;
}

/**
 * Yearly project breakdown data.
 */
export interface YearlyBreakdownType {
  year: string;
  count: number;
}

/**
 * Technology usage breakdown data.
 */
export interface TechnologyBreakdownType {
  technology: string;
  count: number;
  percentage: number;
}

/**
 * Single day of GitHub contributions.
 */
export interface ContributionDayType {
  date: string;
  contributionCount: number;
  color: string;
}

/**
 * Week of GitHub contributions.
 */
export interface ContributionWeekType {
  contributionDays: ContributionDayType[];
}

/**
 * GitHub repository data from API.
 */
export interface RepositoryType {
  name: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

/**
 * GitHub user data from GraphQL API.
 */
export interface GitHubUserType {
  repositories: {
    totalCount: number;
    nodes: RepositoryType[];
  };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: ContributionWeekType[];
    };
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
}

/**
 * Aggregated GitHub statistics for display.
 */
export interface GitHubStatsType {
  publicRepos: number;
  totalStars: number;
  contributions: number;
  contributionCalendar: ContributionWeekType[];
  topLanguages: string[];
  followers: number;
  following: number;
}

/**
 * Technical skill expertise data.
 */
export interface TechnicalExpertiseType {
  technology: string;
  fullName: string;
  value: number;
  normalized: number;
}

/**
 * Combined statistics from all sources.
 */
export interface CombinedStatsType {
  projectStats: ProjectStatsType;
  githubStats: GitHubStatsType;
  technicalExpertise: TechnicalExpertiseType[];
}

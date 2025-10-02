// Project Stats Types
export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  yearlyBreakdown: Array<{ year: string; count: number }>;
  technologyBreakdown: Array<{
    technology: string;
    count: number;
    percentage: number;
  }>;
  diversityScore: number;
  currentInternshipStatus: string;
  mostActiveYear: string;
}

// GitHub Stats Types
export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface Repository {
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

export interface GitHubUser {
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: ContributionWeek[];
    };
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  contributions: number;
  contributionCalendar: ContributionWeek[];
  topLanguages: string[];
  followers: number;
  following: number;
}

// Technical Expertise Types
export interface TechnicalExpertise {
  technology: string;
  fullName: string;
  value: number;
  normalized: number;
}

// Combined Stats Types
export interface CombinedStats {
  projectStats: ProjectStats;
  githubStats: GitHubStats;
  technicalExpertise: TechnicalExpertise[];
}

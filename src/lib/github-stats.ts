export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  topLanguages: string[];
  contributions: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
}

const GITHUB_USERNAME = 'abhisheksharm-3';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    // Fetch user data with no-cache to get fresh data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }
    
    const userData = await userResponse.json();

    // Fetch repositories with fresh data
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!reposResponse.ok) {
      throw new Error(`GitHub repos API error: ${reposResponse.status}`);
    }
    
    const repos: GitHubRepo[] = await reposResponse.json();

    // Calculate stats from actual data
    const languageCounts: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    // Get top languages
    const topLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([lang]) => lang);

    // Estimate contributions based on repo activity
    const currentYear = new Date().getFullYear();
    const thisYearRepos = repos.filter(repo => 
      new Date(repo.updated_at).getFullYear() === currentYear
    );
    const estimatedContributions = Math.min(thisYearRepos.length * 50 + totalStars * 5, 1000);

    return {
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      totalStars,
      totalForks,
      languages: languageCounts,
      topLanguages,
      contributions: estimatedContributions,
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub stats, using fallback:', error);
    // Minimal fallback - will show loading state in UI
    throw error;
  }
}

export function calculateTechnicalExpertise(projects: Array<{tags: string[]}>, githubStats: GitHubStats) {
  // Calculate expertise based on actual project data and GitHub languages
  const projectTechCounts = projects.reduce((acc, project) => {
    project.tags.forEach((tech: string) => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Map technologies to expertise categories
  const expertiseMap = {
    'Frontend': ['React', 'NextJs', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS', 'Vue'],
    'Backend': ['Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'Java', 'Spring', 'Go', 'PostgreSQL'],
    'Mobile': ['React Native', 'Android', 'Kotlin', 'Flutter', 'Swift'],
    'AI/ML': ['Machine Learning', 'TensorFlow', 'PyTorch', 'Python', 'AI'],
    'DevOps': ['Docker', 'AWS', 'Firebase', 'Vercel', 'CI/CD'],
    'Blockchain': ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts']
  };

  return Object.entries(expertiseMap).map(([category, techs]) => {
    // Calculate score based on project usage
    const projectScore = techs.reduce((sum, tech) => sum + (projectTechCounts[tech] || 0), 0);
    
    // Calculate score based on GitHub languages
    const githubScore = techs.reduce((sum, tech) => {
      const langScore = githubStats.languages[tech] || 0;
      return sum + langScore;
    }, 0);

    // Combine and normalize to 100
    const totalScore = projectScore * 8 + githubScore * 3;
    const maxPossibleScore = techs.length * 12;
    const normalizedScore = Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100);

    return {
      technology: category,
      fullName: getCategoryFullName(category),
      value: projectScore + Math.floor(githubScore / 2),
      normalized: Math.max(normalizedScore, 15) // Minimum 15% for categories with any experience
    };
  });
}

function getCategoryFullName(category: string): string {
  const nameMap: Record<string, string> = {
    'Frontend': 'Frontend Development',
    'Backend': 'Backend Development',
    'Mobile': 'Mobile Development',
    'AI/ML': 'AI & Machine Learning',
    'DevOps': 'DevOps & Cloud',
    'Blockchain': 'Blockchain & Web3'
  };
  return nameMap[category] || category;
}

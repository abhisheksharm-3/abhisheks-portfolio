export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  topLanguages: string[];
  contributions: number;
  profileViews?: number;
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
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    const repos: GitHubRepo[] = await reposResponse.json();

    // Calculate language stats
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
      .slice(0, 8)
      .map(([lang]) => lang);

    return {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      languages: languageCounts,
      topLanguages,
      contributions: 0, // Would need GitHub GraphQL API for this
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error);
    // Return fallback data
    return {
      publicRepos: 52,
      followers: 9,
      following: 8,
      totalStars: 25,
      totalForks: 12,
      languages: {
        'TypeScript': 15,
        'JavaScript': 12,
        'Python': 8,
        'Java': 5,
        'Kotlin': 3,
        'Go': 2
      },
      topLanguages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'Go'],
      contributions: 750,
    };
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
    'Frontend': ['React', 'NextJs', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS', 'Vue', 'Svelte'],
    'Backend': ['Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'Java', 'Spring', 'Go', 'PostgreSQL', 'MongoDB'],
    'Mobile': ['React Native', 'Android', 'Kotlin', 'Flutter', 'Swift'],
    'AI/ML': ['Machine Learning', 'TensorFlow', 'PyTorch', 'Python', 'AI', 'LangChain'],
    'DevOps': ['Docker', 'AWS', 'Firebase', 'Vercel', 'CI/CD', 'Kubernetes', 'Linux'],
    'Blockchain': ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts', 'DeFi']
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
    const totalScore = projectScore * 10 + githubScore * 2;
    const maxPossibleScore = techs.length * 15; // Rough maximum
    const normalizedScore = Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100);

    return {
      technology: category,
      fullName: getCategoryFullName(category),
      value: projectScore + githubScore,
      normalized: Math.max(normalizedScore, 20) // Minimum 20% for categories with any experience
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

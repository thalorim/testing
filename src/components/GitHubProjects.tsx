'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
}

const GitHubProjects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sampleProjects = useMemo(() => [
    {
      id: 1,
      name: "raikou.me",
      description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
      html_url: "https://github.com/devraikou/raikou.me",
      homepage: "https://raikou.me",
      stargazers_count: 0,
      forks_count: 0,
      language: "TypeScript",
      topics: ["nextjs", "typescript", "tailwindcss", "portfolio"],
      fork: false
    },
    {
      id: 2,
      name: "Sample Project",
      description: "A modern web application built with React and TypeScript.",
      html_url: "https://github.com/devraikou",
      homepage: "",
      stargazers_count: 0,
      forks_count: 0,
      language: "TypeScript",
      topics: ["react", "typescript", "web"],
      fork: false
    }
  ], []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/devraikou/repos?sort=pushed&direction=desc');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.statusText}`);
        }
        
        const data: Repository[] = await response.json();
        const filteredRepos = data.filter(repo => !repo.fork && repo.description);
        setRepos(filteredRepos.slice(0, 6));
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setError('Could not load GitHub repositories');
        // Use mock data instead
        setRepos(sampleProjects as Repository[]);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      fetchRepos();
    }
  }, [inView, sampleProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-400',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C#': 'bg-purple-500',
      PHP: 'bg-indigo-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      Ruby: 'bg-red-600',
      Dart: 'bg-cyan-400',
      Swift: 'bg-orange-500',
      Kotlin: 'bg-purple-400',
    };

    return colors[language] || 'bg-gray-500';
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {error && (
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <p className="text-red-500 mb-2">{error}</p>
                  <p className="text-sm opacity-70">Showing sample projects instead.</p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    variants={itemVariants}
                    className="card group hover:shadow-lg transition-all duration-500"
                  >
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">{repo.name}</h3>
                    <p className="text-sm opacity-80 mb-4 line-clamp-2">{repo.description}</p>
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 3).map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 rounded-full gradient-border"
                          >
                            {tag}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="text-xs px-2 py-1 opacity-70">+{repo.topics.length - 3}</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4">
                      {repo.language && (
                        <span className="flex items-center text-sm">
                          <span className={`inline-block w-3 h-3 rounded-full mr-1 ${getLanguageColor(repo.language)}`}></span>
                          {repo.language}
                        </span>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center text-sm"><FiStar className="mr-1" /> {repo.stargazers_count}</span>
                        <span className="flex items-center text-sm"><FiGitBranch className="mr-1" /> {repo.forks_count}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:gradient-text transition-all duration-300"
                      >
                        <FiGithub size={18} />
                        <span>Code</span>
                      </Link>
                      
                      {repo.homepage && (
                        <Link 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:gradient-text transition-all duration-300"
                        >
                          <FiExternalLink size={18} />
                          <span>Demo</span>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="text-center mt-12"
              >
                <Link 
                  href="https://github.com/devraikou" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gradient-border px-8 py-3 rounded-full inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                >
                  <FiGithub size={20} />
                  <span>View More on GitHub</span>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjects; 
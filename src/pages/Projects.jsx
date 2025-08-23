import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Filter, Search } from 'lucide-react';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        // Filter to only show published projects
        const publishedProjects = storedProjects.filter(project => project.status === 'Published');
        setProjects(publishedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();

    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      loadProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Other'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.technologies && project.technologies.some(tech => 
                           tech.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, featuring full-stack applications, frontend designs, 
            and backend systems built with modern technologies.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedFilter === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm border border-white/20 dark:border-gray-700/20'
                  }`}
                >
                  <Filter className="inline h-4 w-4 mr-2" />
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 dark:border-gray-700/20 group ${
                  project.isFeatured ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {project.isFeatured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                      {project.links?.external && (
                        <a
                          href={project.links.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.challenge && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Key Challenge:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {projects.length === 0 
                ? "No projects added yet. Add projects from your admin dashboard." 
                : "No projects found matching your criteria."}
            </p>
            {projects.length === 0 && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Projects need to be published in the admin dashboard to appear here.
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
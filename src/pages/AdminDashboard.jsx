import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Edit, Trash2, Plus, Users, FolderOpen, Mail, 
  BarChart3, BookOpen, X, Link, Github, ExternalLink,
  Search, Calendar, MessageSquare, ArrowUpRight, RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { Tracking } from '../utils/tracking';

// Mock API service functions
const api = {
  getProjects: () => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    return Promise.resolve(projects);
  },
  
  saveProjects: (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    return Promise.resolve(projects);
  },
  
  getMessages: () => {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    return Promise.resolve(messages);
  },
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    profileViews: 0,
    totalVisitors: 0
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsData, messagesData] = await Promise.all([
        api.getProjects(),
        api.getMessages(),
      ]);
      
      // Get stats from tracking system
      const trackingStats = Tracking.getStats();
      
      setProjects(projectsData);
      setMessages(messagesData.slice(0, 5)); // Show only 5 recent messages
      setStats({
        totalProjects: projectsData.length,
        totalMessages: messagesData.length,
        profileViews: trackingStats.profileViews || 0,
        totalVisitors: trackingStats.totalVisitors || 0
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSaveProject = async (projectData) => {
    try {
      let updatedProjects;
      
      if (editingProject) {
        // Update existing project
        updatedProjects = projects.map(p => 
          p.id === editingProject.id ? { ...projectData, id: p.id, views: p.views } : p
        );
      } else {
        // Add new project
        const newProject = {
          ...projectData,
          id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
          views: 0,
          createdAt: new Date().toISOString()
        };
        updatedProjects = [...projects, newProject];
      }
      
      setProjects(updatedProjects);
      await api.saveProjects(updatedProjects);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalProjects: updatedProjects.length
      }));
      
      setShowAddModal(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      await api.saveProjects(updatedProjects);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalProjects: updatedProjects.length
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowAddModal(true);
  };

  const handleViewProject = (project) => {
    setViewingProject(project);
    setShowViewModal(true);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats cards data - now using real data
  const statsData = [
    { 
      label: 'Total Projects', 
      value: stats.totalProjects, 
      icon: FolderOpen, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      label: 'Messages', 
      value: stats.totalMessages, 
      icon: Mail, 
      color: 'from-green-500 to-green-600' 
    },
    { 
      label: 'Profile Views', 
      value: stats.profileViews.toLocaleString(), 
      icon: Eye, 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      label: 'Total Visitors', 
      value: stats.totalVisitors.toLocaleString(), 
      icon: Users, 
      color: 'from-orange-500 to-orange-600' 
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your portfolio content</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Stats</span>
            </button>
            <RouterLink
              to="/admin/blog"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Manage Blog</span>
            </RouterLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{message.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{message.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(message.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No messages yet</p>
              )}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowAddModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Published'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          {project.views} views
                        </span>
                        {project.isFeatured && (
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        title="Edit project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                        title="View project"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No projects found</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Project
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setShowAddModal(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* View Project Modal */}
      {showViewModal && viewingProject && (
        <ViewProjectModal
          project={viewingProject}
          onClose={() => {
            setShowViewModal(false);
            setViewingProject(null);
          }}
          onEdit={() => {
            setShowViewModal(false);
            handleEditProject(viewingProject);
          }}
        />
      )}
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    category: 'Full-Stack',
    description: '',
    challenge: '',
    technologies: [],
    currentTechnology: '',
    imageUrl: '',
    isFeatured: false,
    links: {
      github: '',
      demo: '',
      external: ''
    }
  });

  // Initialize form with project data if editing
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        status: project.status || 'Draft',
        category: project.category || 'Full-Stack',
        description: project.description || '',
        challenge: project.challenge || '',
        technologies: project.technologies || [],
        currentTechnology: '',
        imageUrl: project.imageUrl || '',
        isFeatured: project.isFeatured || false,
        links: {
          github: project.links?.github || '',
          demo: project.links?.demo || '',
          external: project.links?.external || ''
        }
      });
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTechnology = () => {
    if (formData.currentTechnology.trim() !== '') {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, formData.currentTechnology.trim()],
        currentTechnology: ''
      });
    }
  };

  const removeTechnology = (index) => {
    const updatedTech = [...formData.technologies];
    updatedTech.splice(index, 1);
    setFormData({ ...formData, technologies: updatedTech });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              required
              placeholder="Enter project name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                required
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                required
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              rows="3"
              required
              placeholder="Brief description of the project"
            />
          </div>
          
          {/* Key Challenge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Key Challenge
            </label>
            <textarea
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              rows="2"
              placeholder="Main challenge you solved in this project"
            />
          </div>
          
          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formData.currentTechnology}
                onChange={(e) => setFormData({ ...formData, currentTechnology: e.target.value })}
                className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="Add a technology"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Github className="h-4 w-4 inline mr-1" />
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.links.github}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  links: { ...formData.links, github: e.target.value } 
                })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://github.com/username/project"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <ExternalLink className="h-4 w-4 inline mr-1" />
                Demo URL
              </label>
              <input
                type="url"
                value={formData.links.demo}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  links: { ...formData.links, demo: e.target.value } 
                })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://your-project-demo.com"
              />
            </div>
          </div>
          
          {/* External Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Link className="h-4 w-4 inline mr-1" />
              External URL
            </label>
            <input
              type="url"
              value={formData.links.external}
              onChange={(e) => setFormData({ 
                ...formData, 
                links: { ...formData.links, external: e.target.value } 
              })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              placeholder="https://other-link.com"
            />
          </div>
          
          {/* Featured Project */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Feature this project on the homepage
            </label>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// View Project Modal Component
const ViewProjectModal = ({ project, onClose, onEdit }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Project Details
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  project.status === 'Published'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                }`}>
                  {project.status}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.category}
                </span>
                {project.isFeatured && (
                  <span className="text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {project.views} views
              </span>
            </div>
          </div>
          
          {/* Project Image */}
          {project.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.name}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          </div>
          
          {/* Key Challenge */}
          {project.challenge && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Challenge</h4>
              <p className="text-gray-700 dark:text-gray-300">{project.challenge}</p>
            </div>
          )}
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Links */}
          {(project.links?.github || project.links?.demo || project.links?.external) && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Links</h4>
              <div className="space-y-2">
                {project.links?.github && (
                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      GitHub Repository
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                {project.links?.demo && (
                  <div className="flex items-center">
                    <ExternalLink className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <a 
                      href={project.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      Live Demo
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                {project.links?.external && (
                  <div className="flex items-center">
                    <Link className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <a 
                      href={project.links.external} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      External Link
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Created Date */}
          {project.createdAt && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Created</h4>
              <p className="text-gray-700 dark:text-gray-300">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Project
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
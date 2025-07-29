import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Plus, Users, FolderOpen, Mail, BarChart3, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout } = useAuth();

  const stats = [
    { label: 'Total Projects', value: '12', icon: FolderOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Messages', value: '23', icon: Mail, color: 'from-green-500 to-green-600' },
    { label: 'Profile Views', value: '1,234', icon: Eye, color: 'from-purple-500 to-purple-600' },
    { label: 'Total Visitors', value: '5,678', icon: Users, color: 'from-orange-500 to-orange-600' },
  ];

  const recentMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: '2024-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration', date: '2024-01-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Website Redesign', date: '2024-01-18' },
  ];

  const recentProjects = [
    { id: 1, name: 'E-Commerce Platform', status: 'Published', views: 156 },
    { id: 2, name: 'Task Management App', status: 'Draft', views: 89 },
    { id: 3, name: 'Weather Dashboard', status: 'Published', views: 234 },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your portfolio content</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/blog"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Manage Blog</span>
            </Link>
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
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
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
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{message.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{message.subject}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{message.date}</p>
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
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
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
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

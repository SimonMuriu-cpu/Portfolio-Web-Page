import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Search, Tag, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/input';
import { jwtDecode } from 'jwt-decode';
import { Card } from '@/components/ui/card';
import { getPosts } from '../services/api';

const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded?.role === 'admin';
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  return (
    <>
      <HelmetProvider>
        <title>Blog - My Thoughts and Insights</title>
        <meta
          name="description"
          content="Read my latest blog posts about development, technology, and personal insights."
        />
      </HelmetProvider>

      <div className="min-h-screen bg-gray-200 dark:bg-blue-950 text-gray-800 dark:text-blue-200">
        {/* Navigation */}
        <nav className="p-6 border-b border-white/10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/">
              <Button variant="ghost" className="text-gray-800 dark:text-white hover:text-purple-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            {isAdmin() && (
              <Link to="/admin">
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              My Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thoughts, insights, and stories from my journey in development and beyond.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 space-y-4"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedTag === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag('')}
                  className={
                    selectedTag === ''
                      ? 'bg-purple-600 text-white'
                      : 'border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white'
                  }
                >
                  All
                </Button>
                {allTags.map((tag, index) => (
                  <Button
                    key={`${tag}-${index}`}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={
                      selectedTag === tag
                        ? 'bg-purple-600 text-white'
                        : 'border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white'
                    }
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-20"
            >
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-gray-200 dark:border-white/10 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">No Posts Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchTerm || selectedTag
                    ? 'No posts match your search criteria.'
                    : 'There are no blog posts yet. Check back later!'}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id || `post-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPage;

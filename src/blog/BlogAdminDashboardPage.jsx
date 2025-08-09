import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { getAllPosts, deletePost } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

function BlogAdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const fetched = await getAllPosts();
      setPosts(fetched);
    } catch (err) {
      toast({
        title: 'Error fetching posts',
        description: err?.response?.data?.message || 'Could not load posts.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id, token);
      toast({
        title: 'Post deleted',
        description: 'The post was successfully deleted.',
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err?.response?.data?.message || 'Could not delete post.',
        variant: 'destructive',
      });
    } finally {
      setDeletingPostId(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <HelmetProvider>
        <title>Blog Admin Dashboard</title>
        <meta name="description" content="Manage your blog content" />
      </HelmetProvider>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gradient-to-br dark:from-blue-900 dark:via-blue-700 dark:to-blue-400 transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-purple-900 dark:text-white">Blog Admin</h1>
              <p className="text-blue-950 dark:text-gray-300 mt-2">Manage your blog content</p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin">
                <Button variant="ghost" className="text-purple-700 dark:text-pink-200 hover:text-purple-500">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio Admin
                </Button>
              </Link>

              <Link to="/admin/create">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 text-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>

          {/* Posts Section */}
          <motion.h2
            className="text-2xl font-semibold text-purple-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Blog Posts
          </motion.h2>

          {loading ? (
            <div className="text-gray-700 dark:text-gray-300 text-lg">Loading posts...</div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No blog posts available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white/60 dark:bg-blue-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-purple-700 dark:text-white">{post.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-purple-600 dark:text-purple-400 border-purple-500 hover:bg-purple-100/30 dark:hover:bg-purple-900/20"
                        onClick={() => navigate(`/admin/blog/edit/${post._id}`)}

                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => setDeletingPostId(post._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deletingPostId && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 w-full max-w-md text-black dark:text-white">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setDeletingPostId(null)}
                  className="border-gray-400 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(deletingPostId)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogAdminDashboardPage;

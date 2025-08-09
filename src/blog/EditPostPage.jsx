import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '../components/ui/use-toast';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

const EditPostPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id, token);
        const post = response?.data || response;

        setFormData({
          title: post.title || '',
          content: post.content || '',
          tags: post.tags || [],
        });
      } catch (error) {
        toast({
          title: 'Error loading post',
          description: error?.response?.data?.message || 'Failed to fetch post details.',
          variant: 'destructive',
        });
        navigate('/admin/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token, toast, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, formData, token);
      toast({
        title: 'Post updated',
        description: 'The post has been successfully updated.',
      });
      navigate('/admin/blog');
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error?.response?.data?.message || 'Could not update post.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading post...</span>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <motion.div
        className="max-w-3xl mx-auto p-4 bg-gray-200 dark:bg-blue-800 rounded-lg shadow-md mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-blue-800 dark:text-gray-200">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4" >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-200"
              rows="10"
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                }))
              }
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update Post
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/blog')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </HelmetProvider>
  );
};

export default EditPostPage;

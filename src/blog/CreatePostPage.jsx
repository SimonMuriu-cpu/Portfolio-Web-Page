import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { createPost } from '@/services/api';

function CreatePostPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in both title and content.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createPost(formData, token);

      const userChoice = window.confirm("✅ Post created successfully!\n\nWould you like to go to the blog page to view it?");

      if (userChoice) {
        navigate('/blog');
      }
      // If not, stay on the current page

    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error creating post',
        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HelmetProvider>
        <title>Create New Post - Admin</title>
        <meta name="description" content="Create a new blog post for the portfolio." />
      </HelmetProvider>

      <div className="min-h-screen">
        {/* Nav */}
        <nav className="p-6 border-b border-white/10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/admin">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Create New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white text-lg font-semibold">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your post title..."
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg p-4 h-auto"
                  required
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-white text-lg font-semibold">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                    className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 bg-purple-600/30 text-purple-200 text-sm rounded-full">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-white text-lg font-semibold">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your post content here..."
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[400px] resize-y"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </Button>
                <Link to="/admin">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-400 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-3"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default CreatePostPage;

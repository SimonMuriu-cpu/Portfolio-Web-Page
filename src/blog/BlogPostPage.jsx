import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const foundPost = posts.find(p => p.id === id);
      setPost(foundPost);
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(' ').length : 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <HelmetProvider>
          <title>Post Not Found - Blog</title>
          <meta name="description" content="The requested blog post could not be found." />
        </HelmetProvider>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HelmetProvider>
        <title>{post.title} - Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </HelmetProvider>
      
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="p-6 border-b border-white/10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/blog">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {getReadingTime(post.content)} min read
                </div>
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                  <div className="text-sm text-gray-400">
                    Updated: {formatDate(post.updatedAt)}
                  </div>
                )}
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-purple-600/30 text-purple-200 text-sm rounded-full"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </article>
      </div>
    </>
  );
}

export default BlogPostPage;
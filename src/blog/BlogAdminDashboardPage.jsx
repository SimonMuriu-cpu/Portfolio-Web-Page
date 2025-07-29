import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { getPosts, deletePost } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const BlogAdminDashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        toast({
          title: 'Error',
          description: 'Failed to load blog posts from the server.',
          variant: 'destructive',
        });
      }
    };

    fetchPosts();
  }, [toast]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(post => post._id !== postId));
      toast({
        title: 'Post deleted',
        description: 'The blog post has been successfully removed.',
      });
    } catch (err) {
      console.error('Error deleting post:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete the post.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Blog Admin</h1>
        <Link to="/admin/create">
          <Button className="text-blue-50 rounded-xl px-6 py-2 text-sm shadow-md">+ New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10 text-gray-600 dark:text-gray-300">
          <p>No blog posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Card key={post._id} className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/blog/${post._id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                  <Link to={`/admin/edit/${post._id}`}>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogAdminDashboardPage;

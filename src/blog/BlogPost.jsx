// pages/BlogPost.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById } from '../services/api';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-blue-950 text-gray-800 dark:text-blue-200">
      <nav className="p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="text-gray-800 dark:text-white hover:text-purple-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <article className="bg-white dark:bg-blue-900/10 rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-4">
            {post.title}
          </h1>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-8 text-sm text-blue-400 dark:text-gray-50">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
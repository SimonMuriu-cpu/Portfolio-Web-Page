const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (Admin)
const createPost = async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      image,
      category,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create post' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin)
const updatePost = async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image, category },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update post' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin)
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

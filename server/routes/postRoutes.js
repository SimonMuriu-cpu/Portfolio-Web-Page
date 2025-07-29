const express = require('express');
const router = express.Router();
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes (admin only)
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;

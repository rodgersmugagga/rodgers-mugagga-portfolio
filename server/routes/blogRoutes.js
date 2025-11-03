const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const { uploadBlogImage, uploadBlogVideo } = require('../config/cloudinary');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/tags', blogController.getAllTags);
router.get('/:slug', blogController.getBlogBySlug);

// Protected routes (admin only)
router.get('/admin/all', auth, blogController.getAllBlogsAdmin);
router.post('/', auth, uploadBlogImage.single('featuredImage'), blogController.createBlog);
router.put('/:id', auth, uploadBlogImage.single('featuredImage'), blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

// Media upload routes (these are for standalone uploads, not part of blog creation)
// router.post('/media/image', auth, uploadBlogImage.single('image'), blogController.uploadMedia);
// router.post('/media/video', auth, uploadBlogVideo.single('video'), blogController.uploadMedia);
// router.post('/:id/media', auth, uploadBlogImage.single('media'), blogController.addMediaToBlog);
// router.delete('/:id/media/:mediaId', auth, blogController.removeMediaFromBlog);

module.exports = router;
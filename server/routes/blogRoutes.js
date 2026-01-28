const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const { uploadBlogImage, uploadBlogVideo } = require('../config/cloudinary');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/tags', blogController.getAllTags);
// Protected routes (admin only) - register BEFORE the slug route so '/admin/*' isn't
// accidentally captured by the param route.
router.get('/admin/all', auth, blogController.getAllBlogsAdmin);
// Admin can fetch a single blog by slug (includes unpublished)
router.get('/admin/:slug', auth, blogController.getBlogBySlugAdmin);
router.post('/', auth, uploadBlogImage.single('featuredImage'), blogController.createBlog);
router.put('/:id', auth, uploadBlogImage.single('featuredImage'), blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

// Public single-blog route (must come after admin routes)
router.get('/:slug', blogController.getBlogBySlug);

// Media upload routes (these are for standalone uploads, not part of blog creation)
// router.post('/media/image', auth, uploadBlogImage.single('image'), blogController.uploadMedia);
// router.post('/media/video', auth, uploadBlogVideo.single('video'), blogController.uploadMedia);
// router.post('/:id/media', auth, uploadBlogImage.single('media'), blogController.addMediaToBlog);
// router.delete('/:id/media/:mediaId', auth, blogController.removeMediaFromBlog);

module.exports = router;
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const { uploadBlogImage, uploadBlogVideo, uploadProfileImage } = require('../config/cloudinary');

// All upload routes require authentication
router.post('/image', auth, uploadBlogImage.single('image'), uploadController.uploadImage);
router.post('/video', auth, uploadBlogVideo.single('video'), uploadController.uploadVideo);
router.post('/profile', auth, uploadProfileImage.single('profile'), uploadController.uploadImage);
router.delete('/media', auth, uploadController.deleteMedia);

module.exports = router;
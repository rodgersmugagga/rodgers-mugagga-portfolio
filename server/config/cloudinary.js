const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for blog images
const blogImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'limit' }],
  },
});

// Storage for blog videos
const blogVideoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-videos',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    resource_type: 'video',
  },
});

// Storage for profile/avatar images
const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }],
  },
});

// Multer upload instances
const uploadBlogImage = multer({ 
  storage: blogImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadBlogVideo = multer({ 
  storage: blogVideoStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

const uploadProfileImage = multer({ 
  storage: profileImageStorage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Function to delete from Cloudinary
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { 
      resource_type: resourceType 
    });
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadBlogImage,
  uploadBlogVideo,
  uploadProfileImage,
  deleteFromCloudinary,
};
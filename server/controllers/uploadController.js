const { deleteFromCloudinary } = require('../config/cloudinary');

// Upload single image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
};

// Upload single video
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading video',
      error: error.message
    });
  }
};

// Delete media from Cloudinary
exports.deleteMedia = async (req, res) => {
  try {
    const { publicId, resourceType = 'image' } = req.body;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }
    
    const result = await deleteFromCloudinary(publicId, resourceType);
    
    res.json({
      success: true,
      message: 'Media deleted successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting media',
      error: error.message
    });
  }
};
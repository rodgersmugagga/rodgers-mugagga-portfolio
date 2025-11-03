const Blog = require('../models/Blog');

// Get all published blogs with pagination and filtering
exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search, sort = '-createdAt' } = req.query;
    
    const query = { published: true };
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const blogs = await Blog.find(query)
      .select('-content') // Exclude full content for listing
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const count = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blogs',
      error: error.message 
    });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    console.log('Fetching blog with slug:', req.params.slug);
    
    // First find without published filter to check if it exists at all
    const unpublishedBlog = await Blog.findOne({ slug: req.params.slug });
    if (unpublishedBlog && !unpublishedBlog.published) {
      console.log('Blog exists but is not published');
      return res.status(404).json({
        success: false,
        message: 'Blog post not yet published'
      });
    }
    
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    
    if (!blog) {
      console.log('Blog not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }
    console.log('Blog found:', blog.title);
    
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blog',
      error: error.message 
    });
  }
};

// Get all blogs (admin - includes unpublished)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort('-createdAt')
      .lean();
    
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blogs',
      error: error.message 
    });
  }
};

// Create new blog (admin only)
exports.createBlog = async (req, res) => {
  //console.log(req.body);
  try {
    const blogData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published === 'true' || req.body.published === true,
      tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags]) : [],
    };

    // Handle featured image from Cloudinary
    if (req.body.featuredImage && req.body.featuredImage.url) {
      blogData.featuredImage = req.body.featuredImage;
    } else if (req.body['featuredImage[url]']) {
      blogData.featuredImage = {
        url: req.body['featuredImage[url]'],
        publicId: req.body['featuredImage[publicId]'] || ''
      };
    }

    // Calculate read time based on content
    const wordsPerMinute = 200;
    const wordCount = req.body.content ? req.body.content.split(/\s+/).length : 0;
    blogData.readTime = Math.ceil(wordCount / wordsPerMinute) || 5;

    const blog = new Blog(blogData);
    await blog.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating blog',
      error: error.message 
    });
  }
};

// Update blog (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published === 'true' || req.body.published === true,
      tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags]) : [],
    };

    // Handle featured image from Cloudinary
    if (req.body.featuredImage && req.body.featuredImage.url) {
      blogData.featuredImage = req.body.featuredImage;
    } else if (req.body['featuredImage[url]']) {
      blogData.featuredImage = {
        url: req.body['featuredImage[url]'],
        publicId: req.body['featuredImage[publicId]'] || ''
      };
    }

    // Calculate read time based on content
    if (req.body.content) {
      const wordsPerMinute = 200;
      const wordCount = req.body.content.split(/\s+/).length;
      blogData.readTime = Math.ceil(wordCount / wordsPerMinute) || 5;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating blog',
      error: error.message 
    });
  }
};

// Delete blog (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting blog',
      error: error.message 
    });
  }
};

// Get all unique tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { published: true });
    
    res.json({
      success: true,
      tags: tags.filter(tag => tag) // Remove empty tags
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tags',
      error: error.message 
    });
  }
};
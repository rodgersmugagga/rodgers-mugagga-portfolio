import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { blogAPI, contactAPI } from '../utils/api';
import ImageUpload from '../components/ImageUpload';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    featuredImage: null,
    published: false,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    } else {
      fetchBlogs();
      fetchContacts();
    }
  }, [isAdmin, navigate]);

  const fetchBlogs = async () => {
    try {
      const { data } = await blogAPI.getAllAdmin();
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchContacts = async () => {
  try {
    const { data } = await contactAPI.getAll();
    setContacts(data.contacts || []);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
};


  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleImageUpload = (imageData) => {
    setFormData({
      ...formData,
      featuredImage: imageData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('excerpt', formData.excerpt);
    blogData.append('content', formData.content);
    blogData.append('published', formData.published);

    // Handle tags
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    tagsArray.forEach(tag => blogData.append('tags', tag));

    // Handle featured image
    if (formData.featuredImage) {
      if (typeof formData.featuredImage === 'object' && formData.featuredImage.url) {
        blogData.append('featuredImage[url]', formData.featuredImage.url);
        blogData.append('featuredImage[publicId]', formData.featuredImage.publicId);
      }
    }

    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, blogData);
      } else {
        await blogAPI.create(blogData);
      }
      resetForm();
      fetchBlogs();
    } catch (error) {
      alert('Error saving blog: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(', '),
      featuredImage: blog.featuredImage || null,
      published: blog.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogAPI.delete(id);
      fetchBlogs();
    } catch (error) {
      alert('Error deleting blog: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      featuredImage: null,
      published: false,
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const insertImageInContent = async (file) => {
    try {
      const { data } = await blogAPI.uploadImage(file);
      if (data.success) {
        const imageUrl = data.media.url;
        const imageMarkup = `<img src="${imageUrl}" alt="Blog image" class="my-4 rounded-lg" />`;
        
        const textarea = document.getElementById('content');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const newContent = text.substring(0, start) + imageMarkup + text.substring(end);
        
        setFormData({ ...formData, content: newContent });
      }
    } catch (error) {
      alert('Error uploading image: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'blogs' ? 'bg-accent text-white' : 'bg-card-light dark:bg-card-dark hover:bg-accent/20'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'contacts' ? 'bg-accent text-white' : 'bg-card-light dark:bg-card-dark hover:bg-accent/20'
            }`}
          >
            Messages ({contacts.length})
          </button>
        </div>

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-6 px-6 py-2 bg-accent text-white rounded-lg hover:-translate-y-1 transition-all duration-300"
            >
              {showForm ? 'Cancel' : 'Create New Blog'}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-card-light dark:bg-card-dark rounded-xl p-6 mb-8 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                </h2>

                {/* Featured Image Upload */}
                <ImageUpload
                  label="Featured Image"
                  onUploadSuccess={handleImageUpload}
                />
                
                {formData.featuredImage?.url && (
                  <div className="relative">
                    <img 
                      src={formData.featuredImage.url} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Excerpt *</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 bg-bg-dark border border-gray-700 rounded-lg focus:outline-none focus:border-accent resize-none"
                  ></textarea>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Content * (HTML supported)</label>
                    <label className="px-3 py-1 bg-accent/20 text-accent rounded cursor-pointer hover:bg-accent/30 transition-colors text-sm">
                      <i className="fa-solid fa-image mr-1"></i> Insert Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && insertImageInContent(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows="15"
                    className="w-full px-4 py-2 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-accent resize-none font-mono text-sm"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    You can use HTML tags for formatting. Click "Insert Image" to add images to your content.
                  </p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-2 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-accent text-white rounded-xl font-medium hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </form>
            )}

            {/* Blogs List */}
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-card-light dark:bg-card-dark rounded-xl p-6">
                  <div className="flex gap-4">
                    {blog.featuredImage?.url && (
                      <img 
                        src={blog.featuredImage.url} 
                        alt={blog.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{blog.published ? '✅ Published' : '📝 Draft'}</span>
                        <span>{blog.views} views</span>
                        <span>{blog.readTime} min read</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* Contacts Tab */}
{activeTab === 'contacts' && (
  <div className="space-y-4">
    {contacts.length === 0 ? (
      <p className="text-gray-500">No messages yet.</p>
    ) : (
      contacts.map((contact) => (
        <div
          key={contact._id}
          className={`bg-card-light dark:bg-card-dark rounded-xl p-6 transition-all ${
            contact.read ? 'opacity-90' : 'border-l-4 border-accent'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="text-gray-400">{contact.email}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </div>

          {contact.subject && (
            <p className="font-medium mb-2">Subject: {contact.subject}</p>
          )}

          <p className="text-gray-300 mb-3">{contact.message}</p>

          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex gap-3">
              <span
                className={`px-2 py-1 rounded-full ${
                  contact.read ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {contact.read ? 'Read' : 'Unread'}
              </span>

              <span
                className={`px-2 py-1 rounded-full ${
                  contact.replied ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {contact.replied ? 'Replied' : 'Not Replied'}
              </span>
            </div>

            <div className="flex gap-2">
              {!contact.read && (
                <button
                  onClick={async () => {
                    try {
                      await contactAPI.markAsRead(contact._id);
                      fetchContacts();
                    } catch (err) {
                      console.error('Error:', err);
                      alert(err?.response?.data?.message || err?.message || 'Something went wrong');
                    }
                  }}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-xs"
                >
                  Mark Read
                </button>
              )}

              {!contact.replied && (
                <button
                  onClick={async () => {
                    try {
                      await contactAPI.markAsReplied(contact._id);
                      fetchContacts();
                    } catch (err) {
                      console.error('Error:', err);
                      alert(err?.response?.data?.message || err?.message || 'Something went wrong');
                    }
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs"
                >
                  Mark Replied
                </button>
              )}

              <button
                onClick={async () => {
                  if (!confirm('Delete this message?')) return;
                  try {
                    await contactAPI.delete(contact._id);
                    fetchContacts();
                  } catch (err) {
                    console.error('Error:', err);
                    alert(err?.response?.data?.message || err?.message || 'Something went wrong');
                  }
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)}


        
      </div>
    </div>
  );
};

export default AdminDashboard;

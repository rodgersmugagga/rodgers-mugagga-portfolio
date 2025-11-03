import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await blogAPI.getAll({ page, limit: 9 });
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Blog"
        description="Articles about web development, MERN stack, programming, and technology by Rodgers Mugagga"
        keywords="web development blog, MERN stack tutorials, programming articles, Uganda tech blog"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": blogs.map((blog, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://rodgers-mugagga-portfolio.netlify.app/blog/${blog.slug}`,
              "name": blog.title,
              "image": blog.featuredImage?.url,
              "description": blog.excerpt
            }))
          })}
        </script>
      </Helmet>


      <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div className="flex-1">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-2">Read My</p>
              <h1 className="text-center text-4xl font-bold">Blog</h1>
            </div>
            <Link
              to="/admin/login"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold
                       hover:-translate-y-1 hover:shadow-glow-accent transition-all duration-300 group"
            >
              <i className="fa-solid fa-user-shield group-hover:scale-110 transition-transform"></i>
              Admin
            </Link>
          </div>
          
          {/* Mobile Admin Button */}
          <div className="md:hidden mb-8">
            <Link
              to="/admin/login"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent text-white rounded-xl font-semibold
                       hover:-translate-y-1 hover:shadow-glow-accent transition-all duration-300"
            >
              <i className="fa-solid fa-user-shield"></i>
              Admin Login
            </Link>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 px-6 py-2 bg-accent text-white rounded-xl hover:-translate-y-1 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="group"
                  >
                    <article className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden 
                                      hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(0,191,255,0.3)]
                                      transition-all duration-300 h-full">
                      {blog.featuredImage?.url && (
                        <div className="overflow-hidden h-48">
                          <img
                            src={blog.featuredImage.url}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                          {blog.title}
                        </h2>
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <time>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        page === i + 1
                          ? 'bg-accent text-white'
                          : 'bg-card-light dark:bg-card-dark text-gray-600 dark:text-gray-400 hover:bg-accent/20 hover:text-accent'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
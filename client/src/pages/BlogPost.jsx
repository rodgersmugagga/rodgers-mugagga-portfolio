import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await blogAPI.getBySlug(slug);

        if (!data.success || !data.blog) {
          throw new Error(data.message || 'Blog not found');
        }

        setBlog(data.blog);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Blog post not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading blog...</div>;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
        <Link to="/blog" className="mt-4 text-blue-500 underline">Back to Blog</Link>
      </div>
    );

  // SEO-rich keywords for AI and Google
  const keywords = `${blog.tags?.join(', ')}, Uganda Tech Blog, Kampala Tech News, East African Software Development, Uganda Developer Insights, Kampala Tech Tips, Uganda Programming Guide, African Tech Solutions, Uganda Software Engineering, Kampala Web Development, Uganda Digital Innovation, East Africa Tech Trends, Ugandan Tech Community, Software Development Uganda, Tech Career Uganda, Programming Tips Uganda, Web Development Kampala, Rodgers Mugagga Tech Blog, Uganda Developer Blog, Kampala Software Engineering, African Software Development, ${blog.title} Uganda, ${blog.title} Kampala, ${blog.title} East Africa`;

  return (
    <>
      {/* SEO Component */}
      <SEO
        title={blog.title}
        description={blog.excerpt}
        type="article"
        image={blog.featuredImage?.url}
        keywords={keywords}
        article={{
          publishedTime: blog.createdAt,
          modifiedTime: blog.updatedAt,
          tags: blog.tags,
          author: "Rodgers Mugagga"
        }}
      />

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "name": "Rodgers Mugagga Software Development",
              "image": "https://rodgers-mugagga-portfolio.netlify.app/logo.png",
              "description": "Expert software development and tech consulting services in Uganda, specializing in web development, mobile apps, and cloud solutions",
              "address": {
                "@type": "PostalAddress",
                
                "addressLocality": "Kampala",
                "addressRegion": "Central Region",
                "postalCode": "256",
                "addressCountry": "UG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "0.3476",
                "longitude": "32.5825"
              },
              "url": "https://rodgers-mugagga-portfolio.netlify.app",
              
              
              "areaServed": ["Kampala", "Uganda", "East Africa"],
              "serviceType": ["Web Development", "Software Engineering", "Cloud Solutions", "Mobile App Development"],
              "knowsAbout": ["MERN Stack", "JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Cloud Computing", "DevOps"],
              "knowsLanguage": ["en", "lg"],
              "sameAs": ["https://www.linkedin.com/in/mugaggarodgers", "https://github.com/rodgersmugagga"]
            },
            {
              "@type": "TechArticle",
              "headline": blog.title,
              "description": blog.excerpt,
              "image": blog.featuredImage?.url,
              "articleBody": blog.content,
              "wordCount": blog.content?.split(' ').length,
              "author": {
                "@type": "Person",
                "name": "Rodgers Mugagga",
                "jobTitle": "Full-Stack Software Engineer",
                "url": "https://rodgers-mugagga-portfolio.netlify.app",
                "addressLocality": "Kampala",
                "addressCountry": "Uganda"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Rodgers Mugagga Portfolio",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://rodgers-mugagga-portfolio.netlify.app/logo.png"
                }
              },
              "datePublished": blog.createdAt,
              "dateModified": blog.updatedAt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://rodgers-mugagga-portfolio.netlify.app/blog/${blog.slug}`
              },
              "keywords": keywords,
              "inLanguage": "en",
              "locationCreated": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kampala",
                  "addressCountry": "Uganda"
                }
              }
            }
          ]
        })}</script>
      </Helmet>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-4">
          By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.featuredImage?.url && (
          <img
            src={blog.featuredImage.url}
            alt={blog.title}
            className="w-full rounded mb-6"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\r\n/g, '<br/>') }}
        />

        <Link to="/blog" className="mt-6 inline-block text-blue-500 underline">
          Back to Blog
        </Link>
      </article>
    </>
  );
};

export default BlogPost;

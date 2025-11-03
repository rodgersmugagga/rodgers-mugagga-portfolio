import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  type = 'website',
  image,
  article,
  keywords,
  schema 
}) => {
  const siteUrl = 'https://rodgers-mugagga-portfolio.netlify.app';
  const defaultImage = 'https://res.cloudinary.com/dnj7dtnvx/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1760456116/listings_app_avatars/dpkpjjogegqnsjvbgx5x.png';
  const defaultKeywords = 'Rodgers Mugagga, Software Engineer Kampala, Web Developer Uganda, Full-Stack Developer Uganda, MERN Stack Developer Kampala, JavaScript Developer Uganda, React Developer Kampala, Node.js Expert Uganda, MongoDB Developer East Africa, Express.js Developer Uganda, TypeScript Developer Kampala, AWS Cloud Engineer Uganda, DevOps Engineer Kampala, Software Development Company Uganda, IT Solutions Uganda, Web Application Developer Kampala, Mobile App Developer Uganda, API Development Kampala, Tech Consultant Uganda, E-commerce Developer Uganda, UI/UX Developer Kampala, Backend Developer Uganda, Frontend Developer Kampala, Database Expert Uganda, Cloud Computing Specialist Kampala, Software Architect Uganda, Tech Lead Kampala, System Design Expert Uganda, REST API Developer Kampala, GraphQL Expert Uganda, Microservices Developer Kampala, Docker Specialist Uganda, Kubernetes Expert Kampala, CI/CD Expert Uganda, African Tech Professional, East African Developer, Ugandan Programmer, Digital Solutions Uganda, Tech Innovation Kampala, Software Solutions East Africa';
  
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title} | Rodgers Mugagga</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={`${siteUrl}${window.location.pathname}`} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${window.location.pathname}`} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:alt" content={`${title} - Rodgers Mugagga`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Article specific meta */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime || article.publishedTime} />
          <meta property="article:author" content="Rodgers Mugagga" />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebPage',
          name: title,
          description: description,
          image: image || defaultImage,
          url: `${siteUrl}${window.location.pathname}`,
          author: {
            '@type': 'Person',
            name: 'Rodgers Mugagga',
            jobTitle: 'Full-Stack Software Engineer',
            url: siteUrl,
            sameAs: [
              'https://github.com/YOUR_GITHUB',
              'https://linkedin.com/in/YOUR_LINKEDIN',
              'https://twitter.com/YOUR_TWITTER'
            ]
          },
          ...(article && {
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime || article.publishedTime,
            keywords: article.tags?.join(', '),
          }),
          ...schema
        })}
      </script>
      {type === 'article' && article && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": description,
            "image": image || defaultImage,
            "author": {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              "name": "Rodgers Mugagga",
              "url": siteUrl,
              "jobTitle": "Full-Stack MERN Developer"
            },
            "publisher": {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              "name": "Rodgers Mugagga"
            },
            "datePublished": article.publishedTime,
            "dateModified": article.modifiedTime || article.publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteUrl}${window.location.pathname}`
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
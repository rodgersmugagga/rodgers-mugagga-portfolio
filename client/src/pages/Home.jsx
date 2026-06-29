import { useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Company from '../components/Company';
import Contact from '../components/Contact';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  useEffect(() => {
    // Intersection Observer for section reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('section-reveal');
      revealObserver.observe(section);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Full-Stack MERN Developer in Kampala, Uganda"
        description="Rodgers Mugagga — Full-Stack developer in Kampala, Uganda building high-performance MERN apps, financial systems, real-estate solutions, and tech insights."
        keywords="Rodgers Mugagga, Full-Stack Developer Uganda, MERN Developer Kampala, Web Developer Uganda, Software Engineer Uganda"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://rodgersmugagga.rodvers.com/#person",
                "name": "Rodgers Mugagga",
                "url": "https://rodgersmugagga.rodvers.com/",
                "sameAs": [
                  "https://github.com/rodgersmugagga",
                  "https://www.linkedin.com/in/mugaggarodgers"
                ],
                "jobTitle": "Full-Stack MERN Developer",
                "description": "Software engineering student and full-stack MERN developer focused on high-performance apps, financial systems, real-estate solutions, and tech articles."
              },
              {
                "@type": "WebSite",
                "@id": "https://rodgersmugagga.rodvers.com/#website",
                "url": "https://rodgersmugagga.rodvers.com/",
                "name": "Rodgers Mugagga — Portfolio",
                "publisher": { "@id": "https://rodgersmugagga.rodvers.com/#person" },
                "inLanguage": "en-US"
              }
            ]
          })}
        </script>
        <link rel="canonical" href="https://rodgersmugagga.rodvers.com/" />
      </Helmet>

  <Hero />
  <About />
  <Experience />
  <Projects />
  <Company />
  <Contact />
    </>
  );
};

export default Home;
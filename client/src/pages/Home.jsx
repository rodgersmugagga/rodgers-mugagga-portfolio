import { useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

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
        description="Rodgers Mugagga — Full-Stack MERN developer in Kampala, Uganda building high-performance MERN apps, financial systems and real-estate solutions."
        keywords="Rodgers Mugagga, Full-Stack Developer in Uganda, Software Engineer in Kampala Uganda, Web Developer in Uganda, MERN Developer Uganda"
      />

      {/* Structured Data for Home Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://rodgers-mugagga-portfolio.netlify.app/#person",
              "name": "Rodgers Mugagga",
              "url": "https://rodgers-mugagga-portfolio.netlify.app/",
              "sameAs": [
                "https://github.com/rodgersmugagga",
                "https://www.linkedin.com/in/mugaggarodgers"
              ],
              "jobTitle": "Full-Stack MERN Developer",
              "description": "Software engineering student and full-stack MERN developer focused on high-performance apps, financial systems and real-estate solutions."
            },
            {
              "@type": "WebSite",
              "@id": "https://rodgers-mugagga-portfolio.netlify.app/#website",
              "url": "https://rodgers-mugagga-portfolio.netlify.app/",
              "name": "Rodgers Mugagga — Portfolio",
              "publisher": { "@id": "https://rodgers-mugagga-portfolio.netlify.app/#person" },
              "inLanguage": "en-US"
            }
          ]
        })}
      </script>

      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
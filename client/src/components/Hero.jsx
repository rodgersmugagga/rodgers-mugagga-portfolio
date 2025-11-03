const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="profile"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center 
                 gap-12 px-8 py-20 bg-bg-light dark:bg-bg-dark 
                 text-text-dark dark:text-text-light relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Profile Picture */}
      <div className="flex-shrink-0 relative z-10 animate-scale-in">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dnj7dtnvx/image/upload/v1760456116/listings_app_avatars/dpkpjjogegqnsjvbgx5x.png"
            alt="Rodgers Mugagga profile picture Full-Stack Developer, Front-End Developer, Back-End Developer, Mobile Developer Based in Kampala, Uganda"
            className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-accent 
                       shadow-[0_0_30px_rgba(0,191,255,0.5)] hover:scale-110 
                       transition-all duration-500 cursor-pointer"
          />
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
        </div>
      </div>

      {/* Profile Text */}
      <div className="text-center lg:text-left max-w-2xl relative z-10 animate-fade-in-up">
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-2 animate-fade-in">Hello I'm</p>
        <h1 className="text-5xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
          Mugagga Rodgers
        </h1>
        <p className="text-2xl lg:text-3xl text-accent mb-2 font-semibold">Full-Stack Developer</p>
        <h2 className="text-lg lg:text-xl mb-6 text-gray-600 dark:text-gray-400">Based in Kampala, Uganda 🇺🇬</h2>
        
        <div className="space-y-3 mb-8 text-sm lg:text-base text-gray-700 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="leading-relaxed">
            Software engineer specializing in <span className="text-accent font-semibold">web and mobile applications</span>. 
            Experienced with <span className="text-accent font-semibold">React, Node.js, Flutter, PHP, and MySQL</span>.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Serving <span className="text-accent font-semibold">Kampala, Entebbe, Mbarara, Masaka</span> and the entire <span className="text-accent font-semibold">East Africa</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="/client/src/assets/RODGERS-RESUME.pdf"
            download="Rodgers-Mugagga-Resume.pdf"
            className="px-8 py-4 bg-accent text-white rounded-xl font-semibold
                      hover:-translate-y-1 hover:shadow-glow-accent-lg
                      transition-all duration-300 group shine-effect inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-download"></i>
            Download CV
          </a>

          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-transparent text-accent border-2 border-accent 
                       rounded-xl font-semibold hover:bg-accent hover:text-white
                       transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-envelope"></i>
              Contact Info
            </span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center lg:justify-start text-3xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="https://github.com/rodgersmugagga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent hover:scale-125 transition-all duration-300 hover:rotate-[360deg]"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/mugaggarodgers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent hover:scale-125 transition-all duration-300 hover:rotate-[360deg]"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 px-8 bg-bg-light dark:bg-bg-dark 
                 text-text-dark dark:text-text-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-2 tracking-wider uppercase">Get To Know More</p>
          <h2 className="text-5xl font-bold text-gradient inline-block">About Me</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Picture */}
          <div className="flex-shrink-0 animate-scale-in">
            <img
              src="https://res.cloudinary.com/dnj7dtnvx/image/upload/v1760456116/listings_app_avatars/dpkpjjogegqnsjvbgx5x.png"
              alt="Rodgers Mugagga Full-Stack Developer, Front-End Developer, Back-End Developer, Mobile Developer Based in Kampala, Uganda"
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-xl about-pic-border 
                         hover:scale-110 transition-transform duration-500 p-1 cursor-pointer"
            />
          </div>

          {/* About Content */}
          <div className="flex-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 
                            text-center hover:-translate-y-2 hover:shadow-glow-accent
                            transition-all duration-300 group cursor-pointer border border-transparent hover:border-accent/30">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block mb-3">
                  <i className="fa-solid fa-award text-accent text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">Experience</h3>
                <p className="text-gray-400">2+ years Fullstack Development</p>
              </div>
              
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 
                            text-center hover:-translate-y-2 hover:shadow-glow-accent
                            transition-all duration-300 group cursor-pointer border border-transparent hover:border-accent/30">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block mb-3">
                  <i className="fa-solid fa-user-graduate text-accent text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">Education</h3>
                <p className="text-gray-400">B.Sc. Software Engineering</p>
              </div>
            </div>

            {/* Bio Text */}
            

            
 <div className="space-y-4 leading-relaxed">
  <p>
    I am <strong>Mugagga Rodgers</strong>, a Full-Stack Software Engineer,
    founder of <strong>{" "}</strong>
    <a href="https://rodvers.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline" > Rodvers Company Limited </a>, and a Software Engineering student at
    <strong> Mbarara University of Science and Technology</strong>.
  </p>

  <p>
    I build scalable web and mobile applications using
    <strong> React, Node.js, Express, Flutter, PostgreSQL, and MongoDB</strong>,
    with a focus on creating technology that solves real business challenges
    and delivers measurable impact.
  </p>

  <p>
    I combine technical expertise
    with <strong>leadership</strong> and a strong commitment to using technology to drive
    innovation and business growth across Africa.
  </p>
 </div>




          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

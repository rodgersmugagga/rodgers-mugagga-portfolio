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
              <p className="text-text-dark dark:text-text-light">
                I am <strong className="text-text-dark dark:text-text-light">Mugagga Rodgers</strong>, a passionate{' '}
                <strong className="text-text-dark dark:text-text-light">Full-Stack MERN Developer</strong> and{' '}
                <strong className="text-text-dark dark:text-text-light">Software Engineering student</strong> at{' '}
                <strong className="text-text-dark dark:text-text-light">Mbarara University of Science & Technology</strong> in Uganda. 
                I specialize in building high-performance{' '}
                <strong className="text-text-dark dark:text-text-light">web applications</strong> and{' '}
                <strong className="text-text-dark dark:text-text-light">mobile apps</strong>, with expertise in{' '}
                <strong className="text-text-dark dark:text-text-light">React, Node.js, JavaScript, Flutter, PHP, and MySQL</strong>.
              </p>
              
              <p className="text-text-dark dark:text-text-light">
                As <strong className="text-text-dark dark:text-text-light">Speaker of MUCOSA</strong>, I developed strong{' '}
                <strong className="text-text-dark dark:text-text-light">leadership</strong> and{' '}
                <strong className="text-text-dark dark:text-text-light">communication skills</strong>, actively contributing 
                to the local and East African <strong className="text-text-dark dark:text-text-light">tech community</strong>.
              </p>
              
              <p className="text-text-dark dark:text-text-light">
                My technical toolkit covers{' '}
                <strong className="text-text-dark dark:text-text-light">front-end and back-end development</strong>,{' '}
                <strong className="text-text-dark dark:text-text-light">API design</strong>, and{' '}
                <strong className="text-text-dark dark:text-text-light">clean, maintainable code</strong>. I continuously 
                explore new technologies and best practices to deliver scalable and efficient 
                software solutions.
              </p>
              
              <p className="text-text-dark dark:text-text-light">
                Browse my <strong className="text-text-dark dark:text-text-light">portfolio projects</strong> to see how 
                I tackle real-world challenges and collaborate effectively on software development 
                projects in Uganda and across East Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

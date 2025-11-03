const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/project-1_hep4ho.png',
      github: 'https://github.com/rodgersmugagga',
      demo: 'https://github.com/rodgersmugagga',
    },
    {
      id: 2,
      title: 'Project Two',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/project-2_nsvp7o.png',
      github: 'https://github.com/rodgersmugagga',
      demo: 'https://github.com/rodgersmugagga',
    },
    {
      id: 3,
      title: 'Project Three',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/project-3_rhinbc.png',
      github: 'https://github.com/rodgersmugagga',
      demo: 'https://github.com/rodgersmugagga',
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-8 bg-bg-light dark:bg-bg-dark 
                 text-text-dark dark:text-text-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-2 tracking-wider uppercase">Browse My Recent</p>
          <h2 className="text-5xl font-bold text-gradient inline-block">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden 
                         hover:-translate-y-3 hover:shadow-glow-accent-lg
                         transition-all duration-500 group border border-transparent hover:border-accent/30
                         animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="overflow-hidden relative">
                <img
                  src={project.image}
                  alt={`${project.title} - Rodgers Mugagga Full-Stack Developer`}
                  className="w-full h-56 object-cover group-hover:scale-110 
                           transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => window.open(project.github, '_blank')}
                    className="px-6 py-2 bg-accent text-white rounded-xl font-semibold
                             hover:-translate-y-1 hover:shadow-glow-accent
                             transition-all duration-300 flex items-center gap-2 group"
                  >
                    <i className="fa-brands fa-github"></i>
                    GitHub
                  </button>
                  <button
                    onClick={() => window.open(project.demo, '_blank')}
                    className="px-6 py-2 bg-transparent text-accent border-2 border-accent 
                             rounded-xl font-semibold hover:bg-accent hover:text-white
                             transition-all duration-300 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-external-link-alt"></i>
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
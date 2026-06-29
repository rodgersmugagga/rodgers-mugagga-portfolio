const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'HarveMart',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/v1769608734/IMG_7589_itw2og.png',
      github: 'https://github.com/rodgersmugagga/agriMarketPlace',
      demo: 'https://harvemart.onrender.com',
      description: "HarveMart — Uganda's trusted agriculture marketplace that connects farmers, buyers and agri-businesses across Kampala, Wakiso, Jinja, Mbarara and beyond; buy and sell crops, livestock, farm equipment and services through localized listings and verified sellers."
    },
    {
      id: 2,
      title: 'Rodvers Company Limited Website',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/v1768078780/IMG_7456_iirjht.jpg',
      github: 'https://github.com/rodgersmugagga/rodvers-company-website',
      demo: 'https://rodvers.com',
      description: 'Rodvers Company Limited website — showcasing the company\'s software, web, and mobile services for businesses in Kampala, Mbarara, and across Uganda, focused on helping local businesses grow digitally.'
    },
    {
      id: 3,
      title: 'listings webApp',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/v1768078780/IMG_7457_c4ijgj.jpg',
      github: 'https://github.com/rodgersmugagga/listings',
      demo: 'https://listings-chvc.onrender.com',
      description: 'A listings application built with the MERN stack and Tailwind CSS. The project demonstrates a React front-end paired with a Node/Express and MongoDB backend to manage listings and related data.'
    },
    {
      id: 4,
      title: 'Rodgers Mugagga Portfolio',
      image: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/v1768078779/IMG_7458_csemcr.jpg',
      github: 'https://github.com/rodgersmugagga/rodgers-mugagga-portfolio',
      demo: 'https://rodgersmugagga.rodvers.com',
      description: 'Personal portfolio for Mugagga Rodgers — a Full-Stack MERN developer based in Kampala, Uganda. The site showcases skills (React, Node.js, Flutter, PHP, MySQL), experience, recent projects, and contact information for clients in Kampala and East Africa.'
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
                  alt={project.description ? `${project.title} — ${project.description}` : `${project.title} - Rodgers Mugagga Full-Stack Developer`}
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
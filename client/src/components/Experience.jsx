const Experience = () => {
  const frontendSkills = [
    { name: 'HTML', level: 'Experienced', icon: 'fa-brands fa-html5' },
    { name: 'CSS', level: 'Experienced', icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', level: 'Experienced', icon: 'fa-brands fa-js' },
    { name: 'React', level: 'Intermediate', icon: 'fa-brands fa-react' },
    { name: 'Flutter', level: 'Basic', icon: 'fa-brands fa-flutter' },
    { name: 'Java', level: 'Experienced', icon: 'fa-brands fa-java' },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 'Experienced', icon: 'fa-brands fa-node-js' },
    { name: 'Express.js', level: 'Experienced', icon: 'fa-brands fa-node' },
    { name: 'Git', level: 'Experienced', icon: 'fa-brands fa-git-alt' },
    { name: 'MySQL', level: 'Experienced', icon: 'fa-solid fa-database' },
    { name: 'PHP', level: 'Intermediate', icon: 'fa-brands fa-php' },
  ];

  const SkillCard = ({ name, level, icon }) => (
    <article className="flex items-center gap-3 bg-card-light dark:bg-card-dark 
                       px-5 py-4 rounded-xl shadow-md min-w-[200px] border border-transparent
                       hover:-translate-y-2 hover:shadow-glow-accent hover:border-accent/30
                       transition-all duration-300 group cursor-pointer">
      <div className="group-hover:scale-125 transition-transform duration-300">
        <i className={`${icon || 'fa-solid fa-circle-check'} text-accent text-2xl`}></i>
      </div>
      <div>
        <h3 className="font-semibold group-hover:text-accent transition-colors">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{level}</p>

      </div>
    </article>
  );

  return (
    <section
      id="experience"
      className="min-h-screen py-20 px-8 bg-bg-light dark:bg-bg-dark 
                 text-text-dark dark:text-text-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-2 tracking-wider uppercase">Explore My</p>
          <h2 className="text-5xl font-bold text-gradient inline-block">Experience</h2>
        </div>

        <div className="space-y-12">
          {/* Front-End Development */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 
                         hover:-translate-y-2 hover:shadow-glow-accent
                         transition-all duration-500 animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-3 text-text-dark dark:text-text-light">

              <i className="fa-solid fa-code text-accent"></i>
              Front-End Development
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {frontendSkills.map((skill, index) => (
                <div key={skill.name} style={{ animationDelay: `${index * 0.05}s` }} className="animate-scale-in">
                  <SkillCard {...skill} />
                </div>
              ))}
            </div>
          </div>

          {/* Back-End Development */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 
                hover:-translate-y-2 hover:shadow-glow-accent
                transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}>

            <h2 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-3">
              <i className="fa-solid fa-server text-accent"></i>
              Back-End Development
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {backendSkills.map((skill, index) => (
                <div key={skill.name} style={{ animationDelay: `${index * 0.05}s` }} className="animate-scale-in">
                  <SkillCard {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
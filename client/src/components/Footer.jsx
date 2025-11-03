const Footer = () => {
  return (
    <footer className="bg-card-light dark:bg-card-dark text-text-dark dark:text-text-light 
                     py-12 px-8 text-center border-t border-gray-200 dark:border-gray-800/50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com/rodgersmugagga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-2xl hover:text-accent hover:scale-125 transition-all duration-300"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/mugaggarodgers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-2xl hover:text-accent hover:scale-125 transition-all duration-300"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Rodgers Mugagga. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
          Rodgers Mugagga — Full-Stack Developer, Kampala, Uganda
        </p>
        <p className="text-sm text-gray-400">
          Hire a software engineer in Uganda for your next web or mobile app project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
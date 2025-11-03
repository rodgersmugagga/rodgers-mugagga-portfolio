import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on outside click or Escape
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('click', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  // Prevent background scroll when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Blogs', path: '/blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-between items-center px-8 py-4 
                      sticky top-0 z-40 bg-bg-light dark:bg-bg-dark 
                      text-text-dark dark:text-text-light transition-all duration-300
                      backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent
                                hover:scale-105 transition-transform duration-300">
          RODVERS
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.path ? (
                <Link
                  to={link.path}
                  className="hover:text-accent transition-all duration-300 relative 
                           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                           after:bg-accent after:transition-all after:duration-300
                           hover:after:w-full"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-accent transition-all duration-300 relative 
                           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                           after:bg-accent after:transition-all after:duration-300
                           hover:after:w-full"
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>


      {/* Mobile/Hamburger Navigation */}
<nav className="lg:hidden flex justify-between items-center px-6 py-4 
                sticky top-0 z-50 bg-bg-light dark:bg-bg-dark 
                text-text-dark dark:text-text-light">
  <Link to="/" className="text-2xl font-semibold">RODGERS</Link>

  <div className="relative" ref={menuRef}>
    {/* Hamburger Icon */}
    <div
      className={`flex flex-col gap-1.5 cursor-pointer ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      role="button"
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <span
        className={`block w-7 h-0.5 bg-accent transition-transform duration-300 
                   ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
      ></span>
      <span
        className={`block w-7 h-0.5 bg-accent transition-opacity duration-300 
                   ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      ></span>
      <span
        className={`block w-7 h-0.5 bg-accent transition-transform duration-300 
                   ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
      ></span>
    </div>

    {/* Mobile Menu Links */}
    <ul
      className={`absolute top-full right-0 mt-4 flex flex-col gap-4 
                 bg-bg-light dark:bg-bg-dark p-6 rounded-lg shadow-xl border border-gray-200 dark:border-transparent
                 transition-all duration-300 ${
                   isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                 }`}
      aria-hidden={!isOpen}
      aria-label="Mobile navigation"
    >
      {navLinks.map((link) => (
        <li key={link.label}>
          {link.path ? (
            <Link
              to={link.path}
              onClick={toggleMenu} // close menu after click
              className="hover:text-accent transition-colors duration-300 whitespace-nowrap"
            >
              {link.label}
            </Link>
            ) : (
              <button
                onClick={() => scrollToSection(link.id)}
                className="hover:text-accent transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>




    </>
  );
};

export default Navbar;
import useTheme from '../context/useTheme';

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center 
                  bg-card-dark dark:bg-card-light rounded-full cursor-pointer 
                  shadow-lg hover:scale-110 transition-transform duration-300 ${className}`}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-pressed={theme === 'dark'}
    >
      <span className="text-2xl">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </div>
  );
};

export default ThemeToggle;

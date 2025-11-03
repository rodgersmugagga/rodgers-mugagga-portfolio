import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark 
                    text-text-dark dark:text-text-light px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-accent text-white rounded-xl font-medium
                   hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,191,255,0.5)]
                   transition-all duration-300 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
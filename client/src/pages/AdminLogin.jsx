import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const AdminLogin = () => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const { verifyPasskey } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (verifyPasskey(passkey)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid passkey');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark 
                    text-text-dark dark:text-text-light px-4">
      <div className="w-full max-w-md">
        <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8">Admin Access</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="passkey" className="block mb-2 text-sm font-medium">
                Passkey
              </label>
              <input
                type="password"
                id="passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 
                         rounded-lg focus:outline-none focus:border-accent transition-colors"
                placeholder="Enter admin passkey"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-white rounded-xl font-medium
                       hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,191,255,0.5)]
                       transition-all duration-300"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
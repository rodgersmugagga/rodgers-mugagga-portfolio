import { useState, useEffect } from 'react';
import { AuthContext } from './authContextCore';

export const AuthProvider = ({ children }) => {
  // Keep both the boolean and the actual passkey in state
  const [adminPasskey, setAdminPasskey] = useState(() => {
    return localStorage.getItem('adminPasskey') || '';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Sync both values to localStorage whenever they change
  useEffect(() => {
    if (adminPasskey) {
      localStorage.setItem('adminPasskey', adminPasskey);
    } else {
      localStorage.removeItem('adminPasskey');
    }
  }, [adminPasskey]);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('isAdmin');
    }
  }, [isAdmin]);

  const verifyPasskey = (passkey) => {
    // Compare with the environment value and, if valid, store the passkey
    // POST to server to validate passkey and obtain a JWT token. This avoids
    // mismatches between client build-time passkey and server runtime secret.
    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkey })
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || 'Login failed');
        }
        return res.json();
      })
      .then((data) => {
        const token = data.token;
        if (token) {
          setAdminPasskey(passkey);
          setIsAdmin(true);
          try {
            localStorage.setItem('adminPasskey', passkey);
            localStorage.setItem('adminToken', token);
            localStorage.setItem('isAdmin', 'true');
          } catch (e) {
            console.warn('Could not write admin state to localStorage', e);
          }
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.warn('Admin login failed', err.message || err);
        return false;
      });
  };

  const logout = () => {
    setAdminPasskey('');
    setIsAdmin(false);
    try {
      localStorage.removeItem('adminPasskey');
      localStorage.removeItem('isAdmin');
    } catch (e) {
      console.warn('Could not remove admin state from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminPasskey, verifyPasskey, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

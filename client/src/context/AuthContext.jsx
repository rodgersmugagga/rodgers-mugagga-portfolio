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
    const isValid = passkey === import.meta.env.VITE_ADMIN_PASSKEY;
    if (isValid) {
      setAdminPasskey(passkey);
      setIsAdmin(true);
    }
    return isValid;
  };

  const logout = () => {
    setAdminPasskey('');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminPasskey, verifyPasskey, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

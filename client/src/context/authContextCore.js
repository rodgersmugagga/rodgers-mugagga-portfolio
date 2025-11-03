import { createContext } from 'react';

// Auth context core — separated into its own file so the provider file
// can export only the component (avoids fast-refresh lint warnings).
export const AuthContext = createContext();

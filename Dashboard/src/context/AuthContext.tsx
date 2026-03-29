import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  token: string; // Add token property
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => void;
  signOut: () => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // In a real application, you would verify the token with your backend
        // and fetch user details. For this example, we'll simulate it.
        // You might have an API endpoint like /api/user/profile that returns user data
        const response = await fetch('http://localhost:5000/api/auth/profile', { // Assuming your backend runs on port 5000
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setToken(storedToken);
        } else {
          // Token might be invalid or expired
          console.error('Failed to fetch user data:', response.statusText);
          signOut(); // Sign out if token is invalid
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        signOut();
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const signIn = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    navigate('/dashboard'); // Redirect to dashboard after sign in
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/auth/signin'); // Redirect to sign-in page after sign out
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

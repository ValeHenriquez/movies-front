'use client'
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type AuthContextType = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const isAuth = localStorage.getItem('token') ? true : false;
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);
  useEffect(() => {
    if (!isAuthenticated
      && pathname !== '/auth/login' && pathname !== '/auth/signup'
    ) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
    else if (isAuthenticated && pathname === '/auth/login' || pathname === '/auth/signup') {
      router.push('/movies')
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}
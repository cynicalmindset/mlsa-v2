import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: any;
  setAuth: (authUser: any) => void;
  setUserData: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (authUser: any) => {
    setUser(authUser);
  };

  const setUserData = (userData: any) => {
    setUser({ ...userData });
    console.log("user", userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

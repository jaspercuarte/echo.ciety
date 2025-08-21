import React, { useContext, useState, createContext, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import supabase from "../supabase-client";

interface AuthContextType {
  user: User | null;
  signInWithGithub: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // check session
  // listen per change (supabase->auth)
  // clean per unmount
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    fetchSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGithub, signOut }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

// own custom hook (acc within func and var)
// check if outside authprovider tsx
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};

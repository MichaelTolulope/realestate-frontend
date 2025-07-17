import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import supabase from "../util/supabase";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist user in localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    const { data, error } = await supabase
      .from("adminuserAccounts")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      toast.error("User not found");
      return false;
    }

    const decodedPassword = atob(data.password);
    if (decodedPassword === password) {
      setUser(data);
      toast.success("Login successful");
      navigate("/admin-dashboard");
      return true;
    } else {
      toast.error("Incorrect password");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/signin");
    toast.info("Logged out");
  };

  return (
    <AuthUserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => useContext(AuthUserContext);

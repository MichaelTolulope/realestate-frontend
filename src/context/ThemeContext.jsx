import { createContext, useState, useContext } from "react"; 
 
 // Theme Context
 export const ThemeContext = createContext();

 export const ThemeContextProvider = ({ children }) => {
   const storedTheme = localStorage.getItem('theme') || 'light';
   const [theme, setTheme] = useState(storedTheme);
   const [transitioning, setIsTransitioning] = useState()
 
   const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setIsTransitioning(false);
    }, 500); // Same duration as animation
  };
 
   return (
     <ThemeContext.Provider value={{ theme, setIsTransitioning, toggleTheme }}>
       {children}
     </ThemeContext.Provider>
   );
 };
 
 // Custom Hooks (optional but recommended)
 export const useTheme = () => useContext(ThemeContext);
 
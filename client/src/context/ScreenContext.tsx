import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext({});

export const ScreenProvider = ({children}: {children: React.JSX.Element}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 748);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    handleResize();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return <ScreenContext.Provider value={{ isMobile, sidebarOpen, toggleSidebar }}>
    {children}
  </ScreenContext.Provider>
}

export const useScreen = () => useContext(ScreenContext);
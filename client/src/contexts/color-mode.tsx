import React, { createContext, useEffect, useState, ReactNode } from "react";
import { ConfigProvider, theme } from "antd";

export type ColorModeContextType = {
  mode: "light" | "dark";
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  setMode: () => {},
});

interface ColorModeContextProviderProps {
  children: ReactNode;
}

export const ColorModeContextProvider: React.FC<ColorModeContextProviderProps> = ({ 
  children 
}) => {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("colorMode") as "light" | "dark") || "light"
  );

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const setColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const antdTheme = {
    algorithm: mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorPrimary: mode === "light" ? "#0ea5e9" : "#38bdf8",
      borderRadius: 6,
      fontFamily: "'Noto Sans', sans-serif",
    },
    components: {
      Typography: {
        colorText: mode === "light" ? "#000" : "#fff",
      },
      Layout: {
        colorBgHeader: mode === "light" ? "#fff" : "#121212",
        colorBgBody: mode === "light" ? "#f8f9fa" : "#121212",
        colorBgTrigger: mode === "light" ? "#fff" : "#1a1a1a",
      },
    },
  };

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode: setColorMode,
      }}
    >
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ColorModeContext.Provider>
  );
};

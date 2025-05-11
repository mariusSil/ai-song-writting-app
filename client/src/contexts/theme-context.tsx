import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

// Define the theme type with light and dark options
type ThemeMode = 'light' | 'dark';

// Define the context type
interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
  colors: {
    mint: string;
    peach: string;
    coral: string;
    red: string;
    navy: string;
    text: string;
    textSecondary: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    base: string;
  };
}

// Color palette from the image
const COLORS = {
  MINT: '#a0bfab',
  PEACH: '#fac2a5',
  CORAL: '#ff8a9a',
  RED: '#e93a52',
  NAVY: '#232a38',
  // Light mode alternatives
  LIGHT_MINT: '#7ca58a',
  LIGHT_PEACH: '#e87c5a',
  LIGHT_CORAL: '#d23653',
  LIGHT_RED: '#af2438',
  LIGHT_NAVY: '#1a202e',
};

// Create default theme colors
const getThemeColors = (mode: ThemeMode) => ({
  mint: mode === 'dark' ? COLORS.MINT : COLORS.LIGHT_MINT,
  peach: mode === 'dark' ? COLORS.PEACH : COLORS.LIGHT_PEACH,
  coral: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
  red: mode === 'dark' ? COLORS.RED : COLORS.LIGHT_RED,
  navy: mode === 'dark' ? COLORS.NAVY : COLORS.LIGHT_NAVY,
  text: mode === 'dark' ? '#ffffff' : '#1a202e',
  textSecondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 32, 46, 0.7)',
  background: mode === 'dark' ? '#1a1f2a' : '#f5f7fa',
  surface: mode === 'dark' ? '#232a38' : '#ffffff',
  surfaceVariant: mode === 'dark' ? '#2a3242' : '#ebedf0',
  base: mode === 'dark' ? '#ffffff' : '#000000',
});

// Create the context with default values
const ThemeContext = createContext<ThemeContextProps>({
  mode: 'dark',
  toggleTheme: () => {},
  colors: getThemeColors('dark'),
});

// Create a hook for easy access to the theme context
export const useTheme = () => useContext(ThemeContext);

// Props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the initial theme from localStorage or default to dark
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem('themeMode') as ThemeMode) || 'dark'
  );

  // Get theme colors based on current mode
  const colors = useMemo(() => getThemeColors(mode), [mode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Create the theme based on the current mode
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
          dark: mode === 'dark' ? COLORS.RED : COLORS.LIGHT_RED,
          light: mode === 'dark' ? COLORS.PEACH : COLORS.LIGHT_PEACH,
          contrastText: '#ffffff',
        },
        secondary: {
          main: mode === 'dark' ? COLORS.MINT : COLORS.LIGHT_MINT,
          contrastText: mode === 'dark' ? COLORS.NAVY : '#ffffff',
        },
        background: {
          default: colors.background,
          paper: colors.surface,
        },
        text: {
          primary: colors.text,
          secondary: colors.textSecondary,
        },
        error: {
          main: COLORS.RED,
        },
      },
      typography: {
        fontFamily: "'Noto Sans', sans-serif",
        h1: {
          fontWeight: 700,
          fontSize: '3rem',
        },
        h2: {
          fontWeight: 700,
          fontSize: '2.25rem',
        },
        h3: {
          fontWeight: 600,
          fontSize: '1.75rem',
        },
        h4: {
          fontWeight: 600,
          fontSize: '1.5rem',
        },
        h5: {
          fontWeight: 600,
          fontSize: '1.25rem',
        },
        h6: {
          fontWeight: 600,
          fontSize: '1rem',
        },
        button: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              padding: '8px 22px',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              },
            },
            contained: {
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
            },
            containedPrimary: {
              background: mode === 'dark' 
                ? `linear-gradient(135deg, ${COLORS.CORAL}, ${COLORS.RED})` 
                : `linear-gradient(135deg, ${COLORS.LIGHT_CORAL}, ${COLORS.LIGHT_RED})`,
            },
            containedSecondary: {
              color: mode === 'dark' ? COLORS.NAVY : '#ffffff',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: colors.surface,
              boxShadow: mode === 'dark' 
                ? '0 4px 12px rgba(0,0,0,0.2)' 
                : '0 2px 8px rgba(0,0,0,0.08)',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
                  borderWidth: 2,
                },
              },
            },
          },
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
        MuiTabs: {
          styleOverrides: {
            indicator: {
              backgroundColor: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              textTransform: 'none',
              '&.Mui-selected': {
                color: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 6,
            },
            colorPrimary: {
              backgroundColor: mode === 'dark' ? 'rgba(255, 138, 154, 0.15)' : 'rgba(210, 54, 83, 0.1)',
              color: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
            },
            colorSecondary: {
              backgroundColor: mode === 'dark' ? 'rgba(160, 191, 171, 0.15)' : 'rgba(124, 165, 138, 0.1)',
              color: mode === 'dark' ? COLORS.MINT : COLORS.LIGHT_MINT,
            },
          },
        },
        MuiSwitch: {
          styleOverrides: {
            switchBase: {
              '&.Mui-checked': {
                color: mode === 'dark' ? COLORS.CORAL : COLORS.LIGHT_CORAL,
                '& + .MuiSwitch-track': {
                  backgroundColor: mode === 'dark' ? COLORS.RED : COLORS.LIGHT_CORAL,
                  opacity: 0.5,
                },
              },
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 600,
              backgroundColor: mode === 'dark' ? colors.surfaceVariant : colors.surfaceVariant,
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
    }),
    [mode, colors]
  );

  // Create the context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      colors,
    }),
    [mode, colors]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: { WebkitFontSmoothing: 'auto' },
            body: { 
              transition: 'background-color 0.3s ease',
              backgroundColor: colors.background,
              color: colors.text
            },
            '::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '::-webkit-scrollbar-track': {
              background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
              borderRadius: '10px',
              '&:hover': {
                background: mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
              },
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

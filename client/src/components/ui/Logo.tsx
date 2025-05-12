import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../contexts/color-mode';
import { useTheme } from '../../contexts/theme-context';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  to?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', to = '/' }) => {
  const { mode } = useContext(ColorModeContext);
  const { colors } = useTheme();
  
  // Calculate size values based on the size prop
  const fontSizes = {
    small: '1.25rem',
    medium: '1.55rem',
    large: '2rem'
  };
  
  const letterSpacings = {
    small: '3px',
    medium: '4px',
    large: '5px'
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textDecoration: 'none',
      width: 'auto',
      lineHeight: 0.8
    }}>
    <Box 
      component={RouterLink}
      to={to}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        textDecoration: 'none',
        width: 'auto',
        position: 'relative',
        lineHeight: 0.8
      }}
    >  
      <Box sx={{ display: 'flex', alignItems: 'center', transform: 'scaleX(1.3)', transformOrigin: 'left' }}>
        <Typography 
          component="span"
          sx={{ 
            fontWeight: 'bold', 
            background: mode === 'light' 
              ? 'linear-gradient(90deg, #333 0%, #666 100%)' 
              : 'linear-gradient(90deg, #fff 0%, #e6e6e6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: letterSpacings[size],
            textShadow: mode === 'light' ? 'none' : '0 0 8px rgba(255,255,255,0.2)',
            lineHeight: .8,
            fontSize: fontSizes[size],
            textTransform: 'uppercase',
            margin: '0 1px',
            fontFamily: '"Orbitron", sans-serif',
 
          }}
        >
          FLO
        </Typography>
        <Typography 
          component="span"
          sx={{ 
            fontWeight: 'bold', 
            background: `linear-gradient(90deg, ${colors.red} 0%, ${colors.coral} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: letterSpacings[size],
            textShadow: `0 0 8px ${colors.red}50`,
            lineHeight: .8,
            fontSize: fontSizes[size],
            textTransform: 'uppercase',
            margin: '0 1px',
            fontFamily: '"Orbitron", sans-serif',
            marginLeft: '-14px'
          }}
        >
          WIN
        </Typography>
      </Box>
      <Typography 
        variant="caption" 
        component="span"
        sx={{ 
          fontSize: size === 'small' ? '0.4rem' : (size === 'large' ? '0.6rem' : '0.5rem'), 
          opacity: 0.8,
          color: mode === 'light' ? '#333' : '#fff',
          letterSpacing: '0.5px',
          right: 0, // Aligns with the 'N' in WIN
          left: 0,
          margin: 'auto',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          fontStyle: 'italic',
          transform: 'translateY(70%)',
          marginTop: '-4px'
        }}
      >
        by SiloMusic & svDominyk
      </Typography>
    </Box>
    </div>
  );
};

export default Logo;

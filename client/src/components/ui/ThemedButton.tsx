import React from 'react';
import { 
  Button, 
  ButtonProps, 
  styled,
  alpha
} from '@mui/material';

// Define additional props for our themed button
interface ThemedButtonProps extends ButtonProps {
  gradient?: boolean;
  glowing?: boolean;
}

// Create a styled button with the theme properties
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'gradient' && prop !== 'glowing',
})<ThemedButtonProps>(({ theme, variant, color, gradient, glowing }) => ({
  borderRadius: 50,
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  
  // Gradient background for contained buttons if gradient prop is true
  ...(gradient && variant === 'contained' && {
    background: color === 'secondary' 
      ? 'linear-gradient(45deg, #38bdf8, #818cf8)'
      : 'linear-gradient(45deg, #ff3366, #ff6b6b)',
    backgroundSize: '150% 100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundPosition: '100% 0',
      boxShadow: color === 'secondary'
        ? `0 4px 15px ${alpha('#38bdf8', 0.4)}`
        : `0 4px 15px ${alpha('#ff3366', 0.4)}`,
    },
  }),
  
  // Glowing effect for buttons if glowing prop is true
  ...(glowing && {
    '&:hover': {
      boxShadow: color === 'secondary'
        ? `0 4px 20px ${alpha('#38bdf8', 0.5)}`
        : `0 4px 20px ${alpha('#ff3366', 0.5)}`,
      transform: 'translateY(-2px)',
    },
  }),
}));

/**
 * ThemedButton Component
 * 
 * A enhanced version of MUI Button with additional styling options
 * like gradient backgrounds and glowing effects
 */
const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  gradient = false,
  glowing = false,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      gradient={gradient}
      glowing={glowing}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default ThemedButton;

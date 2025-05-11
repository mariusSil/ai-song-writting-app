import React, { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Interface for the GradientText component props
interface GradientTextProps extends Omit<TypographyProps, 'sx'> {
  children: ReactNode;
  gradient?: string;
  sx?: any;
}

// Styled component for gradient text
const StyledGradientTypography = styled(Typography)<{ gradient: string }>(({ gradient }) => ({
  background: gradient,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '100%',
  backgroundRepeat: 'repeat',
}));

/**
 * GradientText Component
 * 
 * A reusable component for rendering text with gradient effects
 */
const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'linear-gradient(90deg, #ff3366, #ff6b6b)',
  variant = 'h1',
  sx = {},
  ...rest
}) => {
  return (
    <StyledGradientTypography
      variant={variant}
      gradient={gradient}
      sx={{
        fontWeight: 'bold',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </StyledGradientTypography>
  );
};

export default GradientText;

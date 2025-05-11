import React, { ReactNode } from 'react';
import { Box, Typography, BoxProps, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Define additional props for our section container
interface SectionContainerProps extends BoxProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  gradient?: boolean;
  divider?: boolean;
}

/**
 * SectionContainer Component
 * 
 * A consistent container for sections of content throughout the app
 * with optional title, subtitle, and action buttons
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  headerAction,
  gradient = false,
  divider = false,
  sx = {},
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 5,
        ...(gradient && {
          p: 3,
          borderRadius: 4,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }),
        ...(divider && {
          pb: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
        ...sx
      }}
      {...rest}
    >
      {(title || headerAction) && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: subtitle ? 1 : 3
          }}
        >
          {title && (
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {title}
            </Typography>
          )}
          
          {headerAction && (
            <Box>
              {headerAction}
            </Box>
          )}
        </Box>
      )}
      
      {subtitle && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 3, maxWidth: '800px' }}
        >
          {subtitle}
        </Typography>
      )}
      
      {children}
    </Box>
  );
};

export default SectionContainer;

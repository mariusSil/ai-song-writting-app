import React, { ReactNode } from 'react';
import { Box, Typography, BoxProps, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import GradientText from './GradientText';
import ThemedButton from './ThemedButton';

// Define props for the CTA component
interface CallToActionProps extends BoxProps {
  title: string;
  subtitle?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionProps?: any;
  secondaryActionProps?: any;
  gradientTitle?: boolean;
  children?: ReactNode;
  centered?: boolean;
  actionComponent?: ReactNode;
}

/**
 * CallToAction Component
 * 
 * A reusable call-to-action component that can be used throughout the application
 * with customizable title, subtitle, and actions
 */
const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionProps = {},
  secondaryActionProps = {},
  gradientTitle = true,
  children,
  centered = true,
  actionComponent,
  sx = {},
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 4,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        textAlign: centered ? 'center' : 'left',
        ...sx
      }}
      {...rest}
    >
      {gradientTitle ? (
        <GradientText 
          variant="h3" 
          gutterBottom
          sx={{ 
            mb: 2,
            mx: centered ? 'auto' : 0
          }}
        >
          {title}
        </GradientText>
      ) : (
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{ 
            mb: 2,
            fontWeight: 600
          }}
        >
          {title}
        </Typography>
      )}
      
      {subtitle && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          sx={{ 
            maxWidth: 600, 
            mx: centered ? 'auto' : 0, 
            mb: 4 
          }}
        >
          {subtitle}
        </Typography>
      )}
      
      {children}
      
      {(primaryActionText || secondaryActionText || actionComponent) && (
        <Box 
          sx={{ 
            mt: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: centered ? 'center' : 'flex-start'
          }}
        >
          {actionComponent ? (
            actionComponent
          ) : (
            <>
              {primaryActionText && (
                <ThemedButton
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onPrimaryAction}
                  gradient
                  glowing
                  sx={{ px: 4, py: 1.5 }}
                  {...primaryActionProps}
                >
                  {primaryActionText}
                </ThemedButton>
              )}
              
              {secondaryActionText && (
                <ThemedButton
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={onSecondaryAction}
                  sx={{ px: 4, py: 1.5 }}
                  {...secondaryActionProps}
                >
                  {secondaryActionText}
                </ThemedButton>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CallToAction;

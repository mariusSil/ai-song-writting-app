import React, { useContext } from 'react';
import { Box, Typography, Button, Stack, alpha, Container } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../contexts/theme-context';
import { ColorModeContext } from '../../contexts/color-mode';

const HeroSection: React.FC = () => {
  const { colors } = useTheme();
  const { mode } = useContext(ColorModeContext);

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 600,
      pt: '88px', // Add padding at the top to account for the fixed header
      pb: '80px', // Add padding at the bottom to make room for the TrustBar
    }}>
      {/* Background Image with Dark Grid Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/src/assets/images/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(colors.red, 0.5)} 0%, ${alpha(colors.navy, 0.85)} 100%)`,
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            zIndex: 2
          }
        }}
      />
      
      {/* Centered Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <Box sx={{ px: 2 }}>
          <Typography 
            variant="h1" 
            gutterBottom
            sx={{ 
              background: `linear-gradient(90deg, ${colors.red}, ${colors.coral})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.25rem' },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            The Ultimate AI Music Studio
          </Typography>
          
          {/* Promotional Offer Box */}
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
              mt: 1
            }}
          >
            <Box
              sx={{
                bgcolor: alpha(colors.coral, 0.2),
                border: `2px solid ${alpha(colors.coral, 0.5)}`,
                borderRadius: '8px',
                py: 1.5,
                px: 3,
                position: 'relative',
                boxShadow: `0 5px 15px ${alpha(colors.red, 0.15)}`,
                transform: 'rotate(-1deg)',
                animation: 'pulse 2s infinite'
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 800,
                  color: mode === 'light' ? colors.red : colors.coral,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 0
                }}
              >
                <Box component="span" sx={{ fontSize: '140%', mr: 0.5 }}>30% OFF</Box>
                <Box component="span" sx={{ fontWeight: 600 }}>+ 1 Week Free</Box>
              </Typography>
              
              <Box 
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: colors.red,
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  transform: 'rotate(5deg)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}
              >
                LIMITED TIME
              </Box>
            </Box>
          </Box>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ 
              maxWidth: '750px', 
              mx: 'auto', 
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.5,
              fontWeight: 400
            }}
          >
            The only AI tool music creators need. Collect ideas, write lyrics, compose melodies, 
            arrange tracks, and systematize your creative process — all in one powerful platform.
          </Typography>
          
          <Typography 
            variant="subtitle1"
            color="text.secondary"
            sx={{ 
              maxWidth: '650px', 
              mx: 'auto', 
              mb: 2,
              mt: 2,
              fontStyle: 'italic',
              opacity: 0.9
            }}
          >
            From inspiration to finished tracks — unleash your creativity with AI assistance.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ mt: 4, justifyContent: 'center' }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/register"
              startIcon={<AutoAwesome />}
              sx={{ 
                py: { xs: 1.5, md: 1.75 },
                px: { xs: 3, md: 4 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none'
              }}
            >
              Start Creating
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

import React from 'react';
import { Box, Typography, Button, Stack, alpha, Chip, Container } from '@mui/material';
import { AutoAwesome, LocalOffer } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../contexts/theme-context';

const HeroSection: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: -2
    }}>
      {/* Background Image with Dark Grid Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1533147670608-2a2f9775d2a1?q=80&w=1740&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(colors.red, 0.7)} 0%, ${alpha(colors.navy, 0.8)} 100%)`,
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
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            Create AI-Powered Music
          </Typography>
          
          {/* Promotional Chip */}
          <Chip
            icon={<LocalOffer sx={{ color: colors.coral }} />}
            label="30% OFF + 1 Week Free Trial"
            sx={{
              bgcolor: alpha(colors.coral, 0.1),
              color: colors.base,
              fontWeight: 'bold',
              py: 1.5,
              px: 1,
              mb: 2,
              '& .MuiChip-label': {
                px: 1
              }
            }}
          />
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: '650px', mx: 'auto', mb: 4 }}
          >
            Generate unique songs with cutting-edge AI technology. Craft lyrics, melodies, and entire compositions with just a few clicks.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ mt: 4, justifyContent: 'center' }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/register"
              startIcon={<AutoAwesome />}
            >
              Start Creating
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              component={RouterLink}
              to="/songs"
            >
              Browse Songs
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

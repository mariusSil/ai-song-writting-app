import React, { useContext } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { ColorModeContext } from '../../contexts/color-mode';

// Import icons
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import VerifiedIcon from '@mui/icons-material/Verified';

// Define the props for the TrustBar component
interface TrustBarProps {
  className?: string;
}

const TrustBar: React.FC<TrustBarProps> = ({ className }) => {
  const { mode } = useContext(ColorModeContext);
  
  // Trust platforms configuration
  const trustPlatforms = [
    {
      name: 'G2',
      rating: '4.8/5',
      reviewCount: '120+ reviews',
      logo: '/images/trust/g2-logo.svg',
    },
    {
      name: 'Trustpilot', 
      rating: '4.7/5',
      reviewCount: '98+ reviews',
      logo: '/images/trust/trustpilot-logo.svg',
    },
    {
      name: 'Product Hunt',
      rating: '#2 Product of the Month',
      reviewCount: '250+ upvotes',
      logo: '/images/trust/producthunt-logo.svg',
    },
    {
      name: 'Capterra',
      rating: '4.6/5',
      reviewCount: '75+ reviews',
      logo: '/images/trust/capterra-logo.svg',
    }
  ];

  return (
    <Box 
      sx={{
        width: '100%',
        backgroundColor: mode === 'light' 
          ? 'rgba(245, 245, 245, 0.85)' 
          : 'rgba(18, 18, 18, 0.75)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
        py: { xs: 1.5, md: 2 },
        height: 'auto',
        zIndex: 5,
        boxShadow: mode === 'light'
          ? '0 -4px 20px rgba(0, 0, 0, 0.05)'
          : '0 -4px 20px rgba(0, 0, 0, 0.2)',
      }}
      className={className}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 2 } }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 500, 
              opacity: 0.7,
              fontSize: { xs: '0.75rem', sm: '0.9rem' },
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            Trusted by musicians worldwide
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={2} 
          sx={{ 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {trustPlatforms.map((platform, index) => (
            <Grid 
              key={index}
              sx={{ 
                gridColumn: { xs: 'span 6', sm: 'span 3' },
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: { xs: 1, md: 2 }
              }}
            >
              <Box 
                sx={{ 
                  height: { xs: '30px', md: '40px' }, 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: { xs: 0.5, md: 1 },
                  filter: mode === 'dark' ? 'brightness(1.75)' : 'none',
                  opacity: mode === 'dark' ? 0.9 : 0.75
                }}
              >
                {/* This would be replaced with actual logos */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {platform.name}
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.3,
                  mb: 0.5
                }}
              >
                <StarIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                <StarIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                <StarIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                <StarIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                {platform.name === 'G2' || platform.name === 'Trustpilot' ? (
                  <StarIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                ) : (
                  <StarHalfIcon sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#ffb400' }} />
                )}
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', md: '0.85rem' }
                }}
              >
                {platform.rating}
              </Typography>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.7,
                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.3
                }}
              >
                <VerifiedIcon sx={{ fontSize: { xs: '10px', md: '12px' }, color: '#4CAF50' }} />
                {platform.reviewCount}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBar;

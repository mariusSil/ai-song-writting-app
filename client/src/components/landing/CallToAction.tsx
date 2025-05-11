import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Grid,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../contexts/theme-context';

const CallToAction: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Box 
      component="section" 
      sx={{ 
        py: 10,
        background: `linear-gradient(135deg, ${alpha(colors.red, 0.8)} 0%, ${alpha(colors.coral, 0.8)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        color: colors.text
      }}
    >
      {/* Background elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '120%',
          height: '120%',
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(colors.base)}' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={0} sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 4,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              Ready to Transform Your Songwriting?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                maxWidth: 600, 
                mx: 'auto',
                opacity: 0.9
              }}
            >
              Join thousands of artists who are creating their best work with the help of our AI-powered platform.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/signup"
                sx={{ 
                  bgcolor: colors.surface,
                  color: colors.coral,
                  fontWeight: 'bold',
                  borderRadius: 28,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: alpha(colors.surface, 0.9),
                  }
                }}
              >
                Start Free Trial
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink}
                to="/demo"
                sx={{ 
                  borderColor: colors.base,
                  color: colors.base,
                  borderRadius: 28,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: colors.base,
                    bgcolor: alpha(colors.base, 0.1),
                  }
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction;

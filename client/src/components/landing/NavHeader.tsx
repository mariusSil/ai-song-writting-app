import React, { useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useMediaQuery,
  Stack,
  Container
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../contexts/color-mode';

const NavHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode } = useContext(ColorModeContext);

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0,
      right: 0,
      zIndex: 1200,
      padding: '16px 24px',
      width: '100%',
      pointerEvents: 'none', // This allows clicks to pass through the box but not its children
    }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.7)' 
            : 'rgba(18, 18, 18, 0.75)',
          backdropFilter: 'blur(16px)',
          boxShadow: mode === 'light'
            ? '0 8px 24px rgba(0, 0, 0, 0.08)'
            : '0 8px 24px rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          maxWidth: '1400px',
          margin: '0 auto',
          pointerEvents: 'auto', // Re-enable pointer events for the AppBar
        }}>
        <Container maxWidth={false}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box 
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                textDecoration: 'none',
                minWidth: 150,
                position: 'relative',
                pl: 0.5,
                pb: 1,
                mt: 1
              }}
            >  
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  background: mode === 'light' 
                    ? 'linear-gradient(90deg, #333 0%, #666 100%)' 
                    : 'linear-gradient(90deg, #fff 0%, #e6e6e6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '4px',
                  textShadow: mode === 'light' ? 'none' : '0 0 8px rgba(255,255,255,0.2)',
                  lineHeight: 1,
                  fontSize: '1.55rem',
                  mb: 0,
                  textTransform: 'uppercase',
                  transform: 'scaleX(1.3)',
                  transformOrigin: 'left',
                  width: '160px',
                  fontFamily: '"Orbitron", sans-serif'
                }}
              >
                FLOWIN
              </Typography>
              <Typography 
                variant="caption" 
                component="span"
                sx={{ 
                  fontSize: '0.5rem', 
                  opacity: 0.9,
                  color: mode === 'light' ? '#333' : '#fff',
                  letterSpacing: '0.8px',
                  position: 'absolute',
                  bottom: -2,
                  right: 12,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  fontStyle: 'italic'
                }}
              >
                by SiloMusic & svDominyk
              </Typography>
            </Box>
          
          {!isMobile && (
            <Stack direction="row" spacing={4}>
              <Button color="inherit" component={RouterLink} to="/">Home</Button>
              <Button color="inherit" component={RouterLink} to="/features">Features</Button>
              <Button color="inherit" component={RouterLink} to="/pricing">Pricing</Button>
              <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
            </Stack>
          )}
          
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/login"
              sx={{ borderRadius: 28 }}
            >
              Login / Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
};

export default NavHeader;

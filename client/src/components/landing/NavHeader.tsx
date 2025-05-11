import React from 'react';
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

const NavHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h5" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              textDecoration: 'none'
            }}
          >
            MelodyMuse
          </Typography>
          
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
  );
};

export default NavHeader;

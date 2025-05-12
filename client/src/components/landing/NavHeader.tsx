import React, { useContext, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  useMediaQuery,
  Stack,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Fade
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../contexts/color-mode';
import Logo from '../ui/Logo';
import { useTheme } from '../../contexts/theme-context';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavHeader: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { mode } = useContext(ColorModeContext);
  const { colors } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
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
              ? `rgba(255, 255, 255, 0.92)` 
              : `rgba(18, 18, 18, 0.8)`,
            backdropFilter: 'blur(16px)',
            boxShadow: mode === 'light'
              ? `0 8px 24px ${colors.red}15`
              : `0 8px 24px ${colors.red}25`,
            borderTop: `1px solid ${colors.red}15`,
            borderLeft: `1px solid ${colors.red}10`,
            borderRight: `1px solid ${colors.red}10`,
            borderBottom: 'none',
            borderRadius: '12px',
            maxWidth: '1400px',
            margin: '0 auto',
            pointerEvents: 'auto', // Re-enable pointer events for the AppBar
          }}>
          <Container maxWidth={false}>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
              <Logo size={isMobile ? "small" : "medium"} />
            
            {!isMobile && (
              <Stack direction="row" spacing={4}>
                {navItems.map((item) => (
                  <Button 
                    key={item.path} 
                    color="inherit" 
                    component={RouterLink} 
                    to={item.path}
                    sx={{
                      fontWeight: 500,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: colors.red,
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.3s ease'
                      },
                      '&:hover::after': {
                        transform: 'translateX(0)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile && (
                <IconButton 
                  edge="start" 
                  color="inherit" 
                  aria-label="menu"
                  onClick={toggleMobileMenu}
                  sx={{ mr: 0.5 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Fade in={!isMobile || !mobileMenuOpen}>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/login"
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    borderRadius: 28,
                    background: `linear-gradient(90deg, ${colors.red} 0%, ${colors.coral} 100%)`,
                    color: '#fff',
                    fontWeight: 600,
                    px: { xs: 2, md: 3 },
                    '&:hover': {
                      background: `linear-gradient(90deg, ${colors.red} 20%, ${colors.coral} 120%)`,
                      boxShadow: `0 4px 12px ${colors.red}40`
                    }
                  }}
                >
                  Login / Sign Up
                </Button>
              </Fade>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: '70%',
            maxWidth: '320px',
            bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.97)' : 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px 0 0 12px',
            mt: '80px',
            height: 'calc(100% - 80px)'
          }
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleMobileMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to={item.path}
                onClick={toggleMobileMenu}
                sx={{
                  borderLeft: `3px solid transparent`,
                  '&:hover': {
                    borderLeft: `3px solid ${colors.red}`,
                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'
                  },
                  py: 1.5
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/login"
            onClick={toggleMobileMenu}
            sx={{ 
              borderRadius: 28,
              background: `linear-gradient(90deg, ${colors.red} 0%, ${colors.coral} 100%)`,
              color: '#fff',
              fontWeight: 600,
              py: 1.5,
              '&:hover': {
                background: `linear-gradient(90deg, ${colors.red} 20%, ${colors.coral} 120%)`,
                boxShadow: `0 4px 12px ${colors.red}40`
              }
            }}
          >
            Login / Sign Up
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default NavHeader;

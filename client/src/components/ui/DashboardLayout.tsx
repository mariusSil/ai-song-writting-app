import React, { ReactNode, useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Avatar, 
  Tooltip, 
  useMediaQuery, 
  Container,
  Paper,
  Breadcrumbs,
  Link,
  Stack,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ChevronLeft, 
  Dashboard, 
  MusicNote, 
  Add, 
  Settings, 
  AccountCircle, 
  Logout, 
  Notifications, 
  Lightbulb,
  DarkMode,
  LightMode,
  NavigateNext
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/theme-context';

const DRAWER_WIDTH = 260;

// Define props for the dashboard layout
interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: { label: string; path?: string }[];
  actions?: ReactNode;
  profile?: {
    name: string;
    avatar?: string;
    onProfileClick?: () => void;
    onLogout?: () => void;
  };
}

/**
 * DashboardLayout Component
 * 
 * A responsive layout for the application dashboard with 
 * navigation sidebar, header, and content area
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Dashboard',
  breadcrumbs = [],
  actions,
  profile
}) => {
  const { colors, mode, toggleTheme } = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);
  
  // Navigation items
  const navItems = [
    {
      name: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard'
    },
    {
      name: 'My Songs',
      icon: <MusicNote />,
      path: '/songs'
    },
    {
      name: 'Create Song',
      icon: <Add />,
      path: '/songs/create'
    },
    {
      name: 'Settings',
      icon: <Settings />,
      path: '/settings'
    }
  ];
  
  // Mock notifications for demo
  const notifications = [
    {
      id: 1,
      title: 'Song generated',
      message: 'Your new song "Midnight Dreams" is ready!',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Account update',
      message: 'Your profile was updated successfully',
      time: '1 hour ago',
      read: true
    }
  ];
  
  // Toggle drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // Profile menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  // Notification menu
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };
  
  // Logout
  const handleLogout = () => {
    handleProfileMenuClose();
    if (profile?.onLogout) {
      profile.onLogout();
    }
  };
  
  // Drawer content
  const drawer = (
    <>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        px: 2, 
        py: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Lightbulb sx={{ color: colors.coral, mr: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            SongWriter AI
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      <Box sx={{ overflow: 'auto', flexGrow: 1, py: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  py: 1.5,
                  pl: 3,
                  borderLeft: location.pathname === item.path 
                    ? `3px solid ${colors.coral}` 
                    : '3px solid transparent',
                  '&.Mui-selected': {
                    bgcolor: mode === 'dark' 
                      ? 'rgba(255, 138, 154, 0.1)' 
                      : 'rgba(210, 54, 83, 0.05)',
                    '&:hover': {
                      bgcolor: mode === 'dark' 
                        ? 'rgba(255, 138, 154, 0.15)' 
                        : 'rgba(210, 54, 83, 0.1)',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? colors.coral : undefined,
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: mode === 'dark' ? 'rgba(255, 138, 154, 0.1)' : 'rgba(210, 54, 83, 0.05)',
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: colors.coral, fontWeight: 600, mb: 1 }}>
            Pro Tip
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Try adding reference artists to your prompts for more specific results.
          </Typography>
          <Button 
            component={RouterLink}
            to="/help"
            color="inherit" 
            size="small" 
            sx={{ 
              color: colors.coral, 
              fontWeight: 500,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            Learn more
          </Button>
        </Paper>
      </Box>
    </>
  );
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        color="inherit"
        elevation={0}
        sx={{
          width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: drawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          bgcolor: mode === 'dark' ? colors.navy : colors.surface,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />} 
                aria-label="breadcrumb"
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: '0.875rem',
                  color: 'text.secondary'
                }}
              >
                {breadcrumbs.map((crumb, index) => (
                  crumb.path && index !== breadcrumbs.length - 1 ? (
                    <Link 
                      key={index}
                      component={RouterLink}
                      to={crumb.path}
                      underline="hover"
                      color="inherit"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <Typography 
                      key={index} 
                      color="text.primary" 
                      sx={{ fontWeight: 'medium' }}
                    >
                      {crumb.label}
                    </Typography>
                  )
                ))}
              </Breadcrumbs>
            )}
          </Box>
          
          {actions && (
            <Box sx={{ mr: 2 }}>
              {actions}
            </Box>
          )}
          
          <Stack direction="row" spacing={1}>
            <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationMenuOpen}
              >
                <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            {profile && (
              <Tooltip title={profile.name}>
                <IconButton
                  edge="end"
                  aria-label="account"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {profile.avatar ? (
                    <Avatar src={profile.avatar} alt={profile.name} sx={{ width: 32, height: 32 }} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerOpen ? DRAWER_WIDTH : 0 }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={isMobile && drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              bgcolor: mode === 'dark' ? colors.navy : colors.surface,
              backgroundImage: 'none',
              display: 'flex',
              flexDirection: 'column'
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              bgcolor: mode === 'dark' ? colors.navy : colors.surface,
              backgroundImage: 'none',
              borderRight: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              display: 'flex',
              flexDirection: 'column'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: drawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: mode === 'dark' ? colors.background : colors.background,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3 }, flexGrow: 1 }}>
          {children}
        </Container>
      </Box>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem 
          onClick={() => {
            handleProfileMenuClose();
            if (profile?.onProfileClick) {
              profile.onProfileClick();
            }
          }}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          sx: { width: 320, maxWidth: '100%' }
        }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1.5, fontWeight: 600 }}>
          Notifications
        </Typography>
        <Divider />
        
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={handleNotificationMenuClose}
              sx={{ 
                py: 1.5, 
                px: 2,
                borderLeft: notification.read 
                  ? 'none' 
                  : `3px solid ${colors.coral}`,
                bgcolor: notification.read 
                  ? 'transparent' 
                  : mode === 'dark' 
                    ? 'rgba(255, 138, 154, 0.05)' 
                    : 'rgba(210, 54, 83, 0.02)',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
        
        <Divider />
        <MenuItem onClick={handleNotificationMenuClose} sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="primary">
            View all notifications
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

// Custom Button component used in the layout
const Button: React.FC<{
  component?: any;
  to?: string;
  color?: 'inherit' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  sx?: any;
  children: ReactNode;
  onClick?: () => void;
}> = ({ component, to, color, size, sx, children, onClick }) => {
  return (
    <Box
      component={component || 'button'}
      to={to}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        fontFamily: 'inherit',
        fontSize: size === 'small' ? '0.8125rem' : size === 'large' ? '1rem' : '0.875rem',
        fontWeight: 500,
        padding: 0,
        color: color === 'primary' ? 'primary.main' : color === 'secondary' ? 'secondary.main' : 'inherit',
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default DashboardLayout;

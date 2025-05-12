import React, { useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link,
  Stack,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useTheme } from '../../contexts/theme-context';
import { ColorModeContext } from '../../contexts/color-mode';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer: React.FC = () => {
  const { colors } = useTheme();
  const { mode } = useContext(ColorModeContext);
  const footerLinks = {
    product: [
      { title: 'Features', url: '/features' },
      { title: 'Pricing', url: '/pricing' },
      { title: 'Testimonials', url: '/testimonials' },
      { title: 'FAQ', url: '/faq' }
    ],
    company: [
      { title: 'About Us', url: '/about' },
      { title: 'Blog', url: '/blog' },
      { title: 'Careers', url: '/careers' },
      { title: 'Contact', url: '/contact' }
    ],
    legal: [
      { title: 'Terms of Service', url: '/terms' },
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Cookie Policy', url: '/cookies' }
    ],
    resources: [
      { title: 'Tutorials', url: '/tutorials' },
      { title: 'Support Center', url: '/support' },
      { title: 'Community', url: '/community' }
    ]
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        pt: 8, 
        pb: 4, 
        bgcolor: mode === 'light' ? '#f5f5f5' : '#121212',
        borderTop: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Box sx={{ mb: 3 }}>
              <Logo size="medium" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '380px' }}>
              Transforming your musical ideas into polished songs with the power of AI.
              Elevate your songwriting process and overcome creative blocks.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} MelodyMuse. All rights reserved.
            </Typography>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Product
            </Typography>
            <Stack spacing={1}>
              {footerLinks.product.map((link, i) => (
                <Link 
                  key={i}
                  component={RouterLink} 
                  to={link.url}
                  underline="hover"
                  color="text.secondary"
                  variant="body2"
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Company
            </Typography>
            <Stack spacing={1}>
              {footerLinks.company.map((link, i) => (
                <Link 
                  key={i}
                  component={RouterLink} 
                  to={link.url}
                  underline="hover"
                  color="text.secondary"
                  variant="body2"
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Resources
            </Typography>
            <Stack spacing={1}>
              {footerLinks.resources.map((link, i) => (
                <Link 
                  key={i}
                  component={RouterLink} 
                  to={link.url}
                  underline="hover"
                  color="text.secondary"
                  variant="body2"
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {footerLinks.legal.map((link, i) => (
                <Link 
                  key={i}
                  component={RouterLink} 
                  to={link.url}
                  underline="hover"
                  color="text.secondary"
                  variant="body2"
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          Made with ❤️ for musicians everywhere
        </Typography>
      </Container>
      
      <Divider sx={{ mt: 6, mb: 4, borderColor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }} />
      
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 4 },
            py: 1
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              gap: 0.5
            }}
          >
            Made with <FavoriteIcon sx={{ color: colors.red, fontSize: '1rem' }} /> for musicians everywhere
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={3} 
            divider={<Box sx={{ width: '4px', height: '4px', borderRadius: '50%', bgcolor: 'text.disabled', my: 'auto' }} />}
          >
            <Link component="a" href="#" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Performance
            </Link>
            <Link component="a" href="#" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Memory
            </Link>
            <Link component="a" href="#" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Application
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

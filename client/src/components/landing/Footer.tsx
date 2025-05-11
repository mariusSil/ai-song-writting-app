import React from 'react';
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
import { MusicNote } from '@mui/icons-material';

const Footer: React.FC = () => {
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
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box 
                component={RouterLink} 
                to="/" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                <MusicNote sx={{ mr: 1, color: 'primary.main' }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main'
                  }}
                >
                  MelodyMuse
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Transforming your musical ideas into polished songs with the power of AI.
              Elevate your songwriting process and overcome creative blocks.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} MelodyMuse. All rights reserved.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
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

          <Grid item xs={6} sm={3} md={2}>
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

          <Grid item xs={6} sm={3} md={2}>
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

          <Grid item xs={6} sm={3} md={2}>
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
    </Box>
  );
};

export default Footer;

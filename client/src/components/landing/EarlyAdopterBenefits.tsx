import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  alpha
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../contexts/theme-context';

const EarlyAdopterBenefits: React.FC = () => {
  const { colors } = useTheme();
  const benefits = [
    "Lifetime 30% discount on all subscription plans",
    "Early access to beta features before public release",
    "Priority support from our team of music professionals",
    "Exclusive monthly masterclasses with industry experts",
    "Free music promotion through our partner networks"
  ];

  return (
    <Box 
      component="section" 
      sx={{ 
        py: 10,
        background: (theme) => `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.6)} 0%, ${alpha(theme.palette.secondary.main, 0.6)} 100%)`,
        color: colors.base
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Early Adopter Benefits
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal' }}>
              Join our founding community and receive exclusive perks that won't be available later.
            </Typography>
            
            <List>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutline sx={{ color: colors.base }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={benefit} 
                    primaryTypographyProps={{ 
                      variant: 'body1', 
                      sx: { fontWeight: 'medium' } 
                    }} 
                  />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/signup"
              sx={{ 
                mt: 4,
                bgcolor: colors.surface,
                color: colors.coral,
                fontWeight: 'bold',
                borderRadius: 28,
                px: 4,
                '&:hover': {
                  bgcolor: alpha(colors.surface, 0.9),
                }
              }}
            >
              Join As Early Adopter
            </Button>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Card 
              sx={{ 
                borderRadius: 4, 
                backgroundImage: 'url(https://source.unsplash.com/random/600x400/?concert,music)',
                backgroundSize: 'cover',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.common.black, 0.4)}`
              }}
            >
              <CardContent 
                sx={{ 
                  background: (theme) => `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.8)} 0%, transparent 100%)`,
                  p: 4
                }}
              >
                <Typography variant="overline" sx={{ color: 'primary.light' }}>
                  LIMITED TIME OFFER
                </Typography>
                <Typography variant="h5" component="h3" sx={{ color: colors.base, fontWeight: 'bold' }}>
                  First 500 users get 3 months free access to all Pro features
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EarlyAdopterBenefits;

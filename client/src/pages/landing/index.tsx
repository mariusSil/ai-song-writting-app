import React from 'react';
import { 
  Box, 
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';

// Import all landing page components
import NavHeader from '../../components/landing/NavHeader';
import HeroSection from '../../components/landing/HeroSection';
import TrustBar from '../../components/landing/TrustBar';
import KeyBenefits from '../../components/landing/KeyBenefits';
import HowItWorks from '../../components/landing/HowItWorks';
import Testimonials from '../../components/landing/Testimonials';
import EarlyAdopterBenefits from '../../components/landing/EarlyAdopterBenefits';
import FutureVision from '../../components/landing/FutureVision';
import CallToAction from '../../components/landing/CallToAction';
import Footer from '../../components/landing/Footer';

// Define a custom theme for the landing page
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff3366',
      contrastText: '#fff'
    },
    secondary: {
      main: '#4dabf5',
      contrastText: '#fff'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.0075em',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(255, 51, 102, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(255, 51, 102, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

const LandingPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          overflowX: 'hidden'
        }}
      >
        {/* Navigation */}
        <NavHeader />
        
        {/* Hero Section with Trust Bar */}
        <Box sx={{ position: 'relative' }}>
          <HeroSection />
          <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <TrustBar />
          </Box>
        </Box>
        
        {/* Key Benefits */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <KeyBenefits />
        </Container>
        
        {/* How It Works */}
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container maxWidth="lg">
            <HowItWorks />
          </Container>
        </Box>
        
        {/* Testimonials */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Testimonials />
        </Container>
        
        {/* Early Adopter Benefits */}
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container maxWidth="lg">
            <EarlyAdopterBenefits />
          </Container>
        </Box>
        
        {/* Future Vision */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <FutureVision />
        </Container>
        
        {/* Call to Action */}
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container maxWidth="lg">
            <CallToAction />
          </Container>
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;

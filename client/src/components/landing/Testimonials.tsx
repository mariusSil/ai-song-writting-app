import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  alpha
} from '@mui/material';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, quote, avatarUrl }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        p: 1,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 12px 20px ${alpha(theme.palette.primary.main, 0.2)}`
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic', 
            mb: 3,
            position: 'relative',
            '&:before': {
              content: '"""',
              fontSize: '3rem',
              color: (theme) => alpha(theme.palette.primary.main, 0.3),
              position: 'absolute',
              top: -20,
              left: -10
            }
          }}
        >
          {quote}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar 
            src={avatarUrl || `https://source.unsplash.com/random/100x100/?portrait&${name}`} 
            alt={name} 
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              border: (theme) => `2px solid ${theme.palette.primary.main}`
            }}
          />
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jamie Reynolds",
      role: "Indie Artist",
      quote: "MelodyMuse helped me finish an album I'd been stuck on for months. The AI suggestions sparked ideas I would never have thought of."
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Music Producer",
      quote: "As a producer working with multiple artists, this platform has become my secret weapon for helping clients overcome creative blocks."
    },
    {
      id: 3,
      name: "Marcus Thompson",
      role: "Songwriter",
      quote: "The genre-specific guidance is incredible. It knows the difference between writing for country versus hip-hop, which saved me countless hours."
    }
  ];

  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 6 }}
        >
          Artist Testimonials
        </Typography>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <TestimonialCard 
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;

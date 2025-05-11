import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia,
  alpha,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@mui/material';
import { 
  Edit, 
  AutoAwesome, 
  People, 
  PlayArrow 
} from '@mui/icons-material';

interface StepProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, number, title, description }) => {
  return (
    <ListItem alignItems="flex-start" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <ListItemAvatar>
        <Avatar sx={{ 
          bgcolor: 'primary.main', 
          width: 56, 
          height: 56,
          boxShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
        }}>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <Box 
              component="span" 
              sx={{ 
                bgcolor: alpha('#fff', 0.1), 
                borderRadius: '50%',
                width: 24, 
                height: 24, 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 1,
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              {number}
            </Box>
            {title}
          </Typography>
        }
        secondary={
          <Typography component="span" variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        }
      />
    </ListItem>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <Edit />,
      title: "Start with Your Idea",
      description: "Enter a theme, concept, or partial lyrics to begin your creative journey."
    },
    {
      id: 2,
      icon: <AutoAwesome />,
      title: "AI-Enhanced Development",
      description: "Our AI analyzes countless successful songs to suggest directions for your composition."
    },
    {
      id: 3,
      icon: <People />,
      title: "Collaborative Refinement",
      description: "Fine-tune together with real-time feedback and suggestions to perfect your song."
    },
    {
      id: 4,
      icon: <PlayArrow />,
      title: "Export & Share",
      description: "Download production-ready lyrics and melody guides to use in your preferred DAW."
    }
  ];

  return (
    <Box component="section" sx={{ py: 8, bgcolor: alpha('#000', 0.3) }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 4 }}
            >
              How It Works
            </Typography>
            
            <List sx={{ width: '100%' }}>
              {steps.map((step) => (
                <Step 
                  key={step.id}
                  icon={step.icon}
                  number={step.id}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </List>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Box 
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden',
                boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.common.black, 0.3)}`,
                transform: 'perspective(1500px) rotateY(-15deg)',
                transition: 'transform 0.5s',
                '&:hover': {
                  transform: 'perspective(1500px) rotateY(-5deg)'
                }
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt="AI songwriting process visualization"
                  height="500"
                  image="https://source.unsplash.com/random/600x800/?music,studio"
                  sx={{ 
                    objectFit: 'cover',
                    filter: 'brightness(0.8)'
                  }}
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;

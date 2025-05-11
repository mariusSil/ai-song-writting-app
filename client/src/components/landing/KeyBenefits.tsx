import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  alpha
} from '@mui/material';
import { 
  AutoFixHigh, 
  LibraryMusic, 
  Edit, 
  Psychology 
} from '@mui/icons-material';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(20px)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 12px 20px ${alpha(theme.palette.primary.main, 0.2)}`
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
        <Box 
          sx={{ 
            mb: 2, 
            color: 'primary.main',
            '& .MuiSvgIcon-root': {
              fontSize: 48
            }
          }}
        >
          {icon}
        </Box>
        <Typography 
          variant="h5" 
          component="h3" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const KeyBenefits: React.FC = () => {
  const benefits = [
    {
      id: 1,
      icon: <AutoFixHigh />,
      title: "Breakthrough Writer's Block",
      description: "Intelligent suggestions when you're stuck, helping you overcome creative barriers."
    },
    {
      id: 2,
      icon: <LibraryMusic />,
      title: "Genre-Specific Guidance",
      description: "Tailored to pop, rock, hip-hop, country, and more genres to match your style."
    },
    {
      id: 3,
      icon: <Edit />,
      title: "Co-Writing Intelligence",
      description: "Works alongside you, enhancing your creativity rather than replacing it."
    },
    {
      id: 4,
      icon: <Psychology />,
      title: "Structure Optimization",
      description: "Perfect your song's flow and emotional journey for maximum impact."
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
          Key Benefits
        </Typography>
        
        <Grid container spacing={4}>
          {benefits.map((benefit) => (
            <Grid item xs={12} sm={6} md={3} key={benefit.id}>
              <BenefitCard 
                icon={benefit.icon} 
                title={benefit.title} 
                description={benefit.description} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default KeyBenefits;

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  alpha,
  Chip
} from '@mui/material';
import { 
  TrendingUp, 
  BoltOutlined, 
  Psychology 
} from '@mui/icons-material';

interface VisionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}

const VisionCard: React.FC<VisionCardProps> = ({ icon, title, description, comingSoon }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {comingSoon && (
        <Chip
          label="Coming Soon"
          color="secondary"
          size="small"
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: 16,
            fontWeight: 'bold'
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box 
          sx={{ 
            mb: 2, 
            color: 'primary.main',
            '& .MuiSvgIcon-root': {
              fontSize: 40
            }
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FutureVision: React.FC = () => {
  const visions = [
    {
      id: 1,
      icon: <TrendingUp />,
      title: "Advanced Emotion Tracking",
      description: "Analyze and visualize the emotional arc of your song throughout verses, chorus, and bridge to craft the perfect emotional journey.",
      comingSoon: true
    },
    {
      id: 2,
      icon: <BoltOutlined />,
      title: "Cross-Genre Inspiration",
      description: "Blend elements from different musical styles to create truly unique compositions that push creative boundaries.",
      comingSoon: true
    },
    {
      id: 3,
      icon: <Psychology />,
      title: "Voice-to-Composition",
      description: "Hum or sing your melody ideas directly into the platform and have them instantly converted to professional arrangements.",
      comingSoon: true
    }
  ];

  return (
    <Box component="section" sx={{ py: 8, bgcolor: alpha('#000', 0.3) }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Our Future Vision
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          We're constantly evolving MelodyMuse with cutting-edge AI features to enhance your creative process. Here's a glimpse of what's coming next.
        </Typography>
        
        <Grid container spacing={4}>
          {visions.map((vision) => (
            <Grid item xs={12} md={4} key={vision.id}>
              <VisionCard 
                icon={vision.icon}
                title={vision.title}
                description={vision.description}
                comingSoon={vision.comingSoon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FutureVision;

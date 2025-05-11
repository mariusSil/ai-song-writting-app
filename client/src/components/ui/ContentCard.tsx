import React, { ReactNode } from 'react';
import { 
  Card, 
  CardProps, 
  CardContent, 
  CardHeader, 
  CardActions,
  Typography,
  IconButton,
  Box,
  Divider
} from '@mui/material';
import { useTheme } from '../../contexts/theme-context';

// Define props for the content card
interface ContentCardProps extends Omit<CardProps, 'title'> {
  title?: string | ReactNode;
  subtitle?: string;
  headerAction?: ReactNode;
  headerIcon?: ReactNode;
  footer?: ReactNode;
  noPadding?: boolean;
  noBodyPadding?: boolean;
  bordered?: boolean;
  elevation?: number;
  divider?: boolean;
  children: ReactNode;
}

/**
 * ContentCard Component
 * 
 * A flexible card component for displaying all types of content
 * with customizable header, footer, and styling options
 */
const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  headerAction,
  headerIcon,
  footer,
  noPadding = false,
  noBodyPadding = false,
  bordered = false,
  elevation = 0,
  divider = false,
  children,
  sx,
  ...rest
}) => {
  const { colors, mode } = useTheme();

  return (
    <Card
      elevation={elevation}
      sx={{
        borderRadius: 2,
        border: bordered ? `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...sx
      }}
      {...rest}
    >
      {(title || headerAction || headerIcon) && (
        <>
          <CardHeader
            title={
              typeof title === 'string' ? (
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>
              ) : (
                title
              )
            }
            subheader={subtitle}
            action={headerAction}
            avatar={headerIcon}
            sx={{
              p: noPadding ? 0 : 2,
              pb: divider ? 1.5 : (noPadding ? 0 : 2),
            }}
          />
          {divider && <Divider />}
        </>
      )}

      <CardContent
        sx={{
          p: noPadding || noBodyPadding ? 0 : 2,
          pt: divider && !noBodyPadding ? 2 : undefined,
          flexGrow: 1,
          '&:last-child': {
            pb: noPadding || noBodyPadding ? 0 : 2,
          },
        }}
      >
        {children}
      </CardContent>

      {footer && (
        <>
          {divider && <Divider />}
          <CardActions sx={{ p: noPadding ? 0 : 2, pt: divider ? 1.5 : undefined }}>
            {footer}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ContentCard;

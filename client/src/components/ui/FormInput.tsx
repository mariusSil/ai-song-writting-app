import React from 'react';
import { 
  TextField, 
  TextFieldProps, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  InputAdornment, 
  IconButton, 
  Tooltip
} from '@mui/material';
import { Info } from '@mui/icons-material';

// Extending TextField props with our custom props
interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  tooltip?: string;
  iconEnd?: React.ReactNode;
  onIconEndClick?: () => void;
  iconStart?: React.ReactNode;
  onIconStartClick?: () => void;
}

/**
 * FormInput Component
 * 
 * A consistent input component with optional tooltip and icon support
 */
const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  tooltip,
  error,
  helperText,
  iconEnd,
  onIconEndClick,
  iconStart,
  onIconStartClick,
  sx,
  ...rest
}) => {
  return (
    <FormControl fullWidth error={error} sx={sx}>
      {label && (
        <InputLabel 
          htmlFor={id} 
          shrink 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 0.5,
            position: 'relative',
            transform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
            '&.Mui-error': {
              color: 'error.main',
            }
          }}
        >
          {label}
          {tooltip && (
            <Tooltip title={tooltip} arrow placement="top">
              <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                <Info fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </InputLabel>
      )}
      
      <TextField
        id={id}
        variant="outlined"
        fullWidth
        error={error}
        InputProps={{
          startAdornment: iconStart ? (
            <InputAdornment position="start">
              {onIconStartClick ? (
                <IconButton
                  size="small"
                  edge="start"
                  onClick={onIconStartClick}
                >
                  {iconStart}
                </IconButton>
              ) : (
                iconStart
              )}
            </InputAdornment>
          ) : undefined,
          endAdornment: iconEnd ? (
            <InputAdornment position="end">
              {onIconEndClick ? (
                <IconButton
                  size="small"
                  edge="end"
                  onClick={onIconEndClick}
                >
                  {iconEnd}
                </IconButton>
              ) : (
                iconEnd
              )}
            </InputAdornment>
          ) : undefined,
        }}
        {...rest}
      />
      
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormInput;

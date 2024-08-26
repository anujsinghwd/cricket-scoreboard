import React, { useState } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  label: string;
  selectedColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  defaultColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  selectedColor = 'primary',
  defaultColor = 'secondary',
  isSelected = false,
  ...props
}) => {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = (e: any) => {
    setSelected(!selected);
    if (props?.onClick) {
      props.onClick(e);
    }
  };

  return (
    <MuiButton
      {...props}
      color={selected ? selectedColor : defaultColor}
      variant={(selected && !props?.variant) ? 'contained' : 'outlined'}
      onClick={handleClick}
    >
      {label}
    </MuiButton>
  );
};

export default Button;

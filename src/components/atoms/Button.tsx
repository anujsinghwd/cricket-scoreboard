import React, { useState } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  label: string;
  selectedColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  defaultColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const Button: React.FC<ButtonProps> = ({
  label,
  selectedColor = 'primary',
  defaultColor = 'default',
  ...props
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <MuiButton
      {...props}
      color={selected ? selectedColor : defaultColor}
      onClick={handleClick}
    >
      {label}
    </MuiButton>
  );
};

export default Button;

// src/components/ui/button.tsx
import React from 'react';

type ButtonVariant = 'ghost' | 'outline' | 'solid';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', size = 'md', className, children, ...props }) => {
  const baseStyles = 'rounded px-4 py-2 font-medium focus:outline-none';
  const variantStyles = {
    ghost: 'bg-transparent text-gray-600 border border-gray-300',
    outline: 'bg-transparent text-gray-600 border border-gray-600',
    solid: 'bg-gray-600 text-white'
  };
  const sizeStyles = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
    icon: 'p-1'
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};



import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  children,
  bg,
  color,
  disabled = false,
  style = {},
}) => {
  const baseStyle = {
    backgroundColor: bg,
    color: color,
    border: '1px solid black',
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;

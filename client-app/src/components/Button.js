import React from 'react';

const Button = ({ type = 'button', onClick, children, bg, color }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: bg,
        color: color,
        border: '1px solid black',
        borderRadius: '25px',
      }}
    >
      {children}
    </button>
  );
};

export default Button;

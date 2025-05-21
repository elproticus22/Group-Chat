import React from 'react';

const Pattern = () => {
  return (
    <div className="h-screen">
      <div
        className="w-full h-full"
        style={{
          backgroundColor: 'lightblue',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.9) 3px, transparent 0)',
          backgroundSize: '30px 30px',
          backgroundPosition: '-5px -5px',
        }}
      />
    </div>
  );
};

export default Pattern;

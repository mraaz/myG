import React from "react";

const MyGProgressBar = ({ completed }) => {

  const containerStyle = {
    height: 32,
    width: '100%',
    backgroundColor: "rgb(15, 15, 15)",
    borderRadius: 2,
  };

  const progressStyle = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#E6C846',
    borderRadius: 'inherit',
  };

  return (
    <div style={containerStyle}>
      <div style={progressStyle}>
      </div>
    </div>
  );
};

export default MyGProgressBar;

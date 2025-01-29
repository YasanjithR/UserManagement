import React from "react";

const Logo = ({ size = "md", letter = "H" }) => {
  const sizes = {
    sm: { width: "32px", height: "32px", fontSize: "1rem" },
    md: { width: "48px", height: "48px", fontSize: "1.5rem" },
    lg: { width: "64px", height: "64px", fontSize: "2rem" },
  };

  return (
    <div
      className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
      style={sizes[size]}
    >
      <span className="fw-bold text-white">{letter}</span>
    </div>
  );
};

export default Logo;
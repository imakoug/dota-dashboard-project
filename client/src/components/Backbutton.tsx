import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate(); // Access the navigate function

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <button
      onClick={handleBack}
      style={{
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      <i className="fas fa-arrow-left" style={{ marginRight: "8px" }}></i> {/* Back Arrow Icon */}
      Back
    </button>
  );
};

export default BackButton;

import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Icône équivalente

export const PhotoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // équivalent de navigation.goBack()
      style={{
        width: "59px",
        height: "59px",
        backgroundColor: "#FFFFFF",
        border: "4px solid #ccc", // adapte à Colors.buttons.primaryBorder
        borderRadius: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <AiOutlineArrowLeft size={24} color="black" />
    </button>
  );
};

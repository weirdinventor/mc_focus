import React from "react";
import { Colors } from "./../../../constants/Colors";

interface StripeLoadingOverlayProps {
  message?: string;
  visible?: boolean;
}

export const StripeLoadingOverlay: React.FC<StripeLoadingOverlayProps> = ({
  message = "Traitement en cours...",
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.spinner} className="spinner" />
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: Colors.black60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    backgroundColor: Colors.primaryBlack,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 200,
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  spinner: {
    width: 40,
    height: 40,
    border: `4px solid ${Colors.white}`,
    borderTop: `4px solid ${Colors.seance700}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: 16,
  },
  message: {
    textAlign: "center",
    opacity: 0.9,
    color: Colors.white,
    fontSize: 16,
    margin: 0,
  },
};

// Inject spinner animation into global styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin { 
    0% { transform: rotate(0deg); } 
    100% { transform: rotate(360deg); } 
  }`,
  styleSheet.cssRules.length
);

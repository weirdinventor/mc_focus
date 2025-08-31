import React from 'react';

/**
 * In React web, there's no built-in navigator with a header.
 * The `headerShown: false` and `headerShadowVisible: false` options from
 * React Navigation translate to you creating your own layout components
 * without a default header. This style object can be used for the main
 * container of your application.
 */
export const navigatorLayoutStyles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  // You would define global layout styles here.
};

/**
 * Replicates the visual intent of the `tabConfig`.
 * You would apply these styles to your custom TabBar or Navbar component.
 */
export const tabContainerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e0e0e0',
  boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
};

export const tabLinkStyles: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  textAlign: 'center',
};

/**
 * Style for the text label, corresponding to `tabBarShowLabel: true`.
 * If you wanted to hide the label, you could set `display: 'none'`.
 */
export const tabLabelStyles: React.CSSProperties = {
  display: 'block', // Ensures the label is visible
  fontSize: '12px',
  marginTop: '4px',
};
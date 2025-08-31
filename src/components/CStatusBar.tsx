import React from 'react';

/**
 * CStatusBar component for the web.
 *
 * This is a no-op (no-operation) component. It renders nothing (`null`) because
 * web applications do not have direct control over the native device status bar.
 * It exists to prevent rendering errors in cross-platform codebases.
 */
export const CStatusBar = () => {
  // On the web, this component does nothing and renders nothing.
  return null;
};
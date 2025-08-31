import React from 'react';

const componentStyles = `
  .toggle-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: var(--container-width);
    height: var(--container-height);
    border-radius: var(--container-height);
    background-color: var(--off-background);
  }

  .toggle-inner-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--on-background);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .toggle-knob {
    position: absolute;
    background-color: #FFFFFF;
    width: var(--knob-size);
    height: var(--knob-size);
    border-radius: 50%;
    left: var(--padding);
    transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .toggle-button.activated .toggle-inner-bg {
    opacity: 1;
  }

  .toggle-button.activated .toggle-knob {
    left: calc(var(--container-width) - var(--knob-size) - var(--padding));
  }
`;

interface ToggleProps {
  activated: boolean;
  onPressHandler: () => void;
  size?: number;
}

export const Toggle = ({
  activated,
  onPressHandler,
  size = 32,
}: ToggleProps) => {
  const offBackground = '#333333';
  const onBackground = '#EEEEEE';

  const KNOB_SIZE = size * 0.8;
  const CONTAINER_WIDTH = size * 1.8;
  const PADDING = (size - KNOB_SIZE) / 2;

  const buttonClassName = `toggle-button ${activated ? 'activated' : ''}`;

  const buttonStyle = {
    '--container-width': `${CONTAINER_WIDTH}px`,
    '--container-height': `${size}px`,
    '--knob-size': `${KNOB_SIZE}px`,
    '--padding': `${PADDING}px`,
    '--off-background': offBackground,
    '--on-background': onBackground,
  };

  return (
    <>
      <style>{componentStyles}</style>
      <button
        role="switch"
        aria-checked={activated}
        onClick={onPressHandler}
        className={buttonClassName}
        // --- LA CORRECTION EST ICI ---
        // On dit à TypeScript de traiter cet objet comme un style CSS valide.
        style={buttonStyle as React.CSSProperties}
      >
        <div className="toggle-inner-bg" />
        <div className="toggle-knob" />
      </button>
    </>
  );
};
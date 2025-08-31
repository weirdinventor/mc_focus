import React from 'react';

/**
 * A test component using React.createElement with web elements.
 */
export const TestComponents = () => {
  return React.createElement(
    'div', // View -> div
    { style: { padding: '20px' } }, // Note: CSS units like 'px' are often needed in React JS
    [
      React.createElement(
        'p', // Text -> p (or 'span')
        { key: 'text' },
        'Test Text Component'
      ),
      React.createElement(
        'button', // Button -> button
        {
          key: 'button',
          onClick: () => console.log('Button pressed'), // onPress -> onClick
        },
        'Test Button' // The 'title' prop becomes the child of the button
      ),
    ]
  );
};

export default TestComponents;
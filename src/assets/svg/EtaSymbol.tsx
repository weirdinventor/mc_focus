import * as React from 'react';

// --- The empty interface has been removed ---

/**
 * A React component that renders the Eta Symbol SVG icon.
 * It directly uses React's standard SVGProps type.
 */
const SvgEtaSymbol = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.023 8v5.5a2.5 2.5 0 0 0 2.5 2.5c2.181 0 2.5-2.267 2.5-4a9 9 0 1 0-9 9c1.052 0 2.062-.18 3-.512m1-8.488a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
      stroke="currentColor" // Setting a stroke color is recommended for line icons
      strokeWidth="1.5"
    />
  </svg>
);

export default SvgEtaSymbol;
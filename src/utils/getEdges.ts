/**
 * On the web, the concept of "safe area edges" does not apply as it does on native.
 * Browsers do not have notches or home indicators that content needs to avoid.
 * This function is a web-compatible stub that always returns an empty array,
 * effectively disabling any safe-area calculations.
 */

// Define the 'Edges' type locally since we are not importing it from the native library.
export type Edges = Array<'top' | 'right' | 'bottom' | 'left'>;

export const getEdges = (
  fullscreen: boolean,
  withoutTopEdge: boolean,
  withoutBottomEdge: boolean,
): Edges => {
  // For web, there are no safe area edges to consider. Always return an empty array.
  return [];
};
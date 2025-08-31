import React, { useMemo } from 'react';
import { Drawer } from 'vaul';

// -- Helper for dynamic styles --
const Colors = {
  white: '#FFFFFF',
  black1: '#1E1E1E',
  grey: 'rgba(169, 169, 169, 0.5)',
};

// -- Define Prop Types --
type BaseActionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  snapPoints?: number[];
  initialSnapIndex?: number;
  isLightTheme?: boolean;
};

/**
 * Base ActionSheet component for React JS (`BaseActionSheet`) using Vaul
 *
 * @param {boolean} open - Controls the visibility of the action sheet.
 * @param {function} onOpenChange - Called with the new open state when it changes.
 * @param {Array<number>} [snapPoints] - Snap points ranging from 0 to 1 (fractional). E.g., [0.25, 0.5, 0.9].
 * @param {number} [initialSnapIndex] - Index of the initial snap point from the snapPoints array.
 * @param {React.ReactNode} children - The content of the action sheet.
 * @param {boolean} [isLightTheme=true] - Toggles between light and dark theme.
 * @link
 * https://vaul.emilkowal.ski/
 */
export const BaseActionSheet = ({
  open,
  onOpenChange,
  children,
  snapPoints: snapPointsProp = [1], // Default to 100%
  initialSnapIndex = 0,
  isLightTheme = true,
  ...rest
}: BaseActionSheetProps) => {
  // Memoize active snap point based on the index
  const activeSnapPoint = useMemo(() => {
    return snapPointsProp[initialSnapIndex] || snapPointsProp[0];
  }, [snapPointsProp, initialSnapIndex]);

  // -- Styles --
  // Use React.CSSProperties for strict type checking on styles
  const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    content: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      bottom: '0px',
      left: '0px',
      right: '0px',
      marginTop: '24px',
      borderTopRightRadius: '24px',
      borderTopLeftRadius: '24px',
      paddingBottom: '16px',
      backgroundColor: isLightTheme ? Colors.white : Colors.black1,
      color: isLightTheme ? Colors.black1 : Colors.white,
    },
    indicatorContainer: {
        paddingTop: '12px',
        paddingBottom: '24px',
    },
    indicator: {
      width: '100px',
      height: '4px',
      borderRadius: '99px',
      margin: '0 auto',
      backgroundColor: Colors.grey,
    },
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPointsProp}
      activeSnapPoint={activeSnapPoint}
      {...rest}
    >
      <Drawer.Portal>
        <Drawer.Overlay style={styles.overlay} />
        <Drawer.Content style={styles.content}>
            {/* This div structure mimics the original layout with the indicator */}
            <div style={styles.indicatorContainer}>
               <div style={styles.indicator} />
            </div>
            {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
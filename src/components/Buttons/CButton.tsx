// 1. Import React directly for using its types like `React.JSX.Element`.
import React, { useMemo, useLayoutEffect } from 'react';
import { MCLinearGradient } from '../../components/MCLinearGradient';
import { Colors } from '../../constants/Colors';
import { useButtonState } from '../../hooks/useButtonState';
import { useThemeInterpolation } from '../../hooks/useThemeInterpolation';
import { CText, TextColors, TextSizes } from '../CText';
import { I18nKeyPath, TextOptions } from '../../i18n/types';

// The CSS-in-JS implementation remains an excellent choice.
const componentStyles = `
  .cbutton-container { flex-shrink: 1; width: 100%; border-radius: 800px; }
  .cbutton-base { display: flex; flex-direction: row; justify-content: center; align-items: center; width: 100%; height: 100%; max-height: 72px; border-radius: 800px; overflow: hidden; border: none; cursor: pointer; background-color: transparent; -webkit-tap-highlight-color: transparent; transition: opacity 0.15s ease-in-out; }
  .cbutton-base:disabled { opacity: 0.4; cursor: not-allowed; }
  .cbutton-base:active { opacity: 0.7; }
  .cbutton-base-padding { padding: 20px; }
  .cbutton-small-padding { padding: 12px 16px; }
  .cbutton-small-container { align-self: center; width: auto; }
  .cbutton-primary { border: 4px solid ${Colors.buttons.primaryBorder}; }
  .cbutton-seance, .cbutton-seanceFull { border: 1px solid ${Colors.buttons.whiteBorder}; }
  .cbutton-colored { padding: 0; }
  .cbutton-colored > div { padding: 20px; }
  .cbutton-colored.cbutton-small-padding > div { padding: 12px 16px; }
`;

const useInjectStyles = (styleId: string, css: string) => {
  useLayoutEffect(() => {
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerText = css;
      document.head.appendChild(style);
    }
  }, [styleId, css]);
};

// --- Type Definitions ---
type ButtonTypes = keyof typeof Colors.buttons.light;

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: I18nKeyPath;
  textOptions?: TextOptions;
  buttonType?: ButtonTypes;
  mb?: number;
  mt?: number;
  customStyle?: React.CSSProperties;
  small?: boolean;
}

const $textsData: Record<ButtonTypes, { color: TextColors; size: TextSizes }> = {
  primary: { color: 'black', size: 'md_black' },
  secondary: { color: 'black', size: 'sm' },
  colored: { color: 'white', size: 'md_black' },
  transparent: { color: 'white', size: 'md_bold' },
  seance: { color: 'white', size: 'sm_medium' },
  seanceFull: { color: 'black', size: 'sm_medium' },
};

/**
 * Custom Button Component (`CButton`) for Web with Embedded Styles
 */
export const CButton = ({
  text,
  textOptions,
  buttonType = 'primary',
  mb,
  mt,
  small,
  customStyle,
  ...buttonProps
}: CustomButtonProps): React.JSX.Element => { // 2. Using React.JSX.Element is a common convention
  useInjectStyles('cbutton-styles', componentStyles);

  const { animatedStyle } = useThemeInterpolation(
    Colors.buttons.light[buttonType],
    Colors.buttons.dark[buttonType],
  );

  const { buttonProps: pressStateProps } = useButtonState();

  const containerStyles = useMemo(() => {
    const combinedStyles: React.CSSProperties = { ...animatedStyle, ...customStyle };
    if (mb !== undefined) combinedStyles.marginBottom = `${mb}px`;
    if (mt !== undefined) combinedStyles.marginTop = `${mt}px`;
    return combinedStyles;
  }, [animatedStyle, customStyle, mb, mt]);

  const buttonClassNames = useMemo(() => (
    [
      'cbutton-base',
      `cbutton-${buttonType}`,
      small ? 'cbutton-small-padding' : 'cbutton-base-padding',
    ].join(' ')
  ), [buttonType, small]);

  const containerClassNames = useMemo(() => (
    ['cbutton-container', small ? 'cbutton-small-container' : ''].join(' ')
  ), [small]);

  const renderButtonContent = () => (
    <CText
      isCentered
      size={$textsData[buttonType]?.size}
      text={text}
      color={$textsData[buttonType]?.color}
      textOptions={textOptions}
    />
  );

  return (
    <div style={containerStyles} className={containerClassNames}>
      <button
        {...buttonProps}
        {...pressStateProps}
        className={buttonClassNames}
      >
        {buttonType === 'colored' ? (
          <MCLinearGradient
            colors={Colors.gradients.main}
            locations={[0, 0.05, 0.65, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            {renderButtonContent()}
          </MCLinearGradient>
        ) : (
          renderButtonContent()
        )}
      </button>
    </div>
  );
};
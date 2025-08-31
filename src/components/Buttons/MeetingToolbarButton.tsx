import { useLayoutEffect, useMemo } from 'react';
import { CText } from '../../components/CText';
import { Colors } from '../../constants/Colors';
import { I18nKeyPath } from '../../i18n/types';
import { DynamicIcon } from './DynamicIcon'; // Adjust path as needed

// --- CSS Styles ---
const componentStyles = `
  .toolbar-button-container { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .toolbar-button-pressable { background-color: ${Colors.grey7}; border-radius: 100px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: background-color 0.2s ease; }
  .toolbar-button-pressable:hover { background-color: #dcdcdc; }
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

// --- Component Definition ---
interface MeetingToolbarButtonProps {
  iconName: string;
  iconType: string;
  text: I18nKeyPath;
  onPress: () => void;
  boxSize?: number;
}

export const MeetingToolbarButton = ({
  iconName,
  iconType,
  text,
  onPress,
  boxSize = 48,
}: MeetingToolbarButtonProps) => {
  useInjectStyles('meeting-toolbar-button-styles', componentStyles);

  const buttonStyle = useMemo(() => ({
    width: `${boxSize}px`,
    height: `${boxSize}px`,
  }), [boxSize]);

  return (
    <div className="toolbar-button-container">
      <button
        onClick={onPress}
        style={buttonStyle}
        className="toolbar-button-pressable"
      >
        <DynamicIcon
          type={iconType}
          name={iconName}
          size={Math.round(boxSize * 0.6)}
          color="black"
        />
      </button>
      <CText size="xs_medium" text={text} color="black" />
    </div>
  );
};
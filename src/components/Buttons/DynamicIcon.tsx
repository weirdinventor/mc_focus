//THIS IS A HELPER COMPONENT

// Import the specific icons you need from their libraries
import { IoVideocam, IoVideocamOff, IoMic, IoMicOff } from 'react-icons/io5';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { IconType as ReactIconType } from 'react-icons';

// The original, strongly-typed map is perfect.
const ICON_MAP = {
  ionicon: {
    'videocam': IoVideocam,
    'videocam-off': IoVideocamOff,
    'mic': IoMic,
    'mic-off': IoMicOff,
  },
  material: {
    'screen-share': MdScreenShare,
    'stop-screen-share': MdStopScreenShare,
  },
};

// The props remain simple strings for ease of use.
interface DynamicIconProps {
  type: string;
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * A helper component to render a specific 'react-icons' component based on
 * string props. This version is fully type-safe, avoids 'any', and correctly
 * narrows the type for JSX rendering.
 */
export const DynamicIcon = ({ type, name, ...props }: DynamicIconProps) => {
  let IconComponent: ReactIconType | null = null;

  // Using a switch statement is the clearest way to help TypeScript
  // narrow down the types step-by-step.
  switch (type) {
    case 'ionicon': {
      if (Object.prototype.hasOwnProperty.call(ICON_MAP.ionicon, name)) {
        IconComponent = ICON_MAP.ionicon[name as keyof typeof ICON_MAP.ionicon];
      }
      break;
    }
    case 'material': {
      if (Object.prototype.hasOwnProperty.call(ICON_MAP.material, name)) {
        IconComponent = ICON_MAP.material[name as keyof typeof ICON_MAP.material];
      }
      break;
    }
    default:
      console.warn(`Icon type "${type}" not found.`);
      return null;
  }

  if (!IconComponent) {
    console.warn(`Icon name "${name}" not found in type "${type}".`);
    return null;
  }

  return <IconComponent {...props} />;
};
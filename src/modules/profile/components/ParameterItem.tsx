import React from 'react';
import { CText } from './../../../components/CText';
import { Colors } from './../../../constants/Colors';
import { I18nKeyPath } from './../../../i18n/types';

interface ParameterItemProps {
  title: I18nKeyPath | string;
  iconType?: string; // optionnel, pour compatibilité
  iconName: string;
  onPress: () => void;
  withBottomBorder?: boolean;
}

export const ParameterItem = ({
  title,
  iconName,
  onPress,
  withBottomBorder = true,
}: ParameterItemProps) => {
  return (
    <div
      onClick={onPress}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 16px',
        cursor: 'pointer',
        borderBottom: withBottomBorder ? `1px solid ${Colors.wildSand200}` : undefined,
        transition: 'opacity 0.2s',
      }}
      onMouseDown={(e) => (e.currentTarget.style.opacity = '0.5')}
      onMouseUp={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <i className={iconName} style={{ fontSize: 24, color: Colors.grey6 }} />
        <CText color="black" size="lg_medium" text={title} />
      </div>
      <i className="entypo-chevron-right" style={{ fontSize: 20, color: Colors.seance600 }} />
    </div>
  );
};

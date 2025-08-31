import { CText } from './../../../components/CText';
import { Colors } from './../../../constants/Colors';
import React from 'react';

export const ProChip: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: Colors.seanceWhite,
        display: 'inline-block',
        padding: '4px 7px',
        borderRadius: '72px',
      }}
    >
      <CText color="pink700" text="onboarding.pro" size="xs_extraBold" />
    </div>
  );
};

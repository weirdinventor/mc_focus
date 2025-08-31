import { CText } from './../../../components/CText';
import React from 'react';

export const ConsentText = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <CText size="sm_medium" color="white80" text="onboarding.conditions.1" />
      <CText size="sm_medium" color="white" text="onboarding.conditions.2" />
      <CText size="sm_medium" color="white80" text="onboarding.conditions.3" />
    </div>
  );
};

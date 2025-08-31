import { CText } from './../../components/CText';
import { Colors } from './../../constants/Colors';
import React from 'react';

interface SectionChatHeaderProps {
  title: string;
}

export const SectionChatHeader = ({ title }: SectionChatHeaderProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.line} />
      <div style={styles.textWrapper}>
        <CText
          size="sm_medium"
          text="common.customString"
          color="grey"
          textOptions={{ value: title }}
        />
      </div>
      <div style={styles.line} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteSand50,
  },
  textWrapper: {
    backgroundColor: Colors.grey4,
    marginLeft: '8px',
    marginRight: '8px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '40px',
  },
  line: {
    height: '1px',
    flex: 1,
    backgroundColor: Colors.grey10,
  },
};
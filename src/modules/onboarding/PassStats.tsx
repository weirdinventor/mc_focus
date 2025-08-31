import React, { useEffect } from 'react';
import { CText } from './../../components/CText';
import { Colors } from './../../constants/Colors';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface PassStatsProps {
  newPassword: string;
  onValidChange?: (isValid: boolean) => void;
  isError: boolean;
}

export const PassStats: React.FC<PassStatsProps> = ({
  newPassword,
  onValidChange,
  isError,
}) => {
  const characters = newPassword.length >= 8;
  const oneLetter = !!newPassword.match(/[a-zA-Z]/);
  const oneNumber = !!newPassword.match(/[0-9]/);
  const oneSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const isValid = characters && oneLetter && oneNumber && oneSpecial;

  useEffect(() => {
    if (onValidChange) {
      onValidChange(isValid);
    }
  }, [isValid, onValidChange]);

  const getColor = (condition: boolean) =>
    condition ? Colors.green : isError ? Colors.deepRed : Colors.grey2;

  return (
    <div style={styles.container}>
      <CText text="pass_stats.title" size="sm_bold" />
      
      <div style={styles.text}>
        <AiOutlineCheckCircle size={18} color={getColor(characters)} />
        <CText text="pass_stats.characters" color="grey5" size="xs_medium" />
      </div>

      <div style={styles.text}>
        <AiOutlineCheckCircle size={18} color={getColor(oneSpecial)} />
        <CText text="pass_stats.one_special" color="grey5" size="xs_medium" />
      </div>

      <div style={styles.text}>
        <AiOutlineCheckCircle size={18} color={getColor(oneLetter)} />
        <CText text="pass_stats.one_letter" color="grey5" size="xs_medium" />
      </div>

      <div style={styles.text}>
        <AiOutlineCheckCircle size={18} color={getColor(oneNumber)} />
        <CText text="pass_stats.one_number" color="grey5" size="xs_medium" />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px 24px',
    gap: 12,
    backgroundColor: Colors.grey7,
    borderRadius: 16,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
};

import { CText } from './../../components/CText';
import { CustomUser } from './../../components/CustomUser';
import React from 'react';

// L'interface des props reste inchangée
export interface BaseLiveCardDescriptionProps {
  author: string;
  timeAgo: number; // Cette prop n'était pas utilisée dans le JSX, mais elle est conservée
  title: string;
  profilePicture: string | null;
  description?: string;
}

export const BaseLiveCardDescription = ({
  author,
  title,
  profilePicture,
  description,
}: BaseLiveCardDescriptionProps) => {
  return (
    // Le composant <View> est remplacé par <div>
    <div>
      <div style={styles.nameWrapper}>
        <CustomUser
          profilePicture={profilePicture}
          isRow={true}
          user={author}
        />
      </div>
      <CText size="md_bold">{title}</CText>
      {description && (
        <CText mt={4} mb={24} size="sm_medium" color="grey">
          {description}
        </CText>
      )}
    </div>
  );
};

// StyleSheet.create est remplacé par un objet de style standard pour React.js
const styles: { [key: string]: React.CSSProperties } = {
  nameWrapper: {
    display: 'flex', // Ajouté pour activer le flexbox sur le web
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '12px', // Unités 'px' ajoutées
    marginTop: '16px',    // Unités 'px' ajoutées
    alignItems: 'center',
  },
};
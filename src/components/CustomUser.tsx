import React from 'react';

// Importation des versions web de vos composants
import { CText } from './../components/CText';
// L'importation d'images sur le web renvoie une URL
import defaultAvatar from '../../src/assets/images/avatarPink.png';

// --- Styles CSS qui remplacent StyleSheet ---
const componentStyles = `
  .custom-user-wrapper {
    /* Équivalent de logoWrapper */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }

  .custom-user-image {
    /* Équivalent de imageBorder et des props de CImage */
    border-radius: 8px;
    object-fit: cover; /* Équivalent de resizeMode="cover" */
  }

  .text-container {
    /* Un conteneur de base pour le texte */
    display: flex;
  }
  
  .text-container.row {
    /* Équivalent de rowTextContainer */
    flex-direction: row;
  }

  .text-container.column {
    /* Équivalent de columnTextContainer */
    flex-direction: column;
  }
`;

// --- Interface des props pour le web ---
interface CustomUserProps {
  user: string;
  profilePicture: string | null;
  isRow?: boolean;
}

/**
 * Affiche l'avatar et le nom d'un utilisateur, converti pour React JS.
 */
export const CustomUser = ({
  user,
  profilePicture,
  isRow,
}: CustomUserProps) => {
  // Détermine dynamiquement la classe CSS à appliquer
  const textContainerClassName = `text-container ${isRow ? 'row' : 'column'}`;

  // Gère l'image de profil par défaut
  const imageSource = profilePicture || defaultAvatar;

  return (
    <>
      <style>{componentStyles}</style>
      <div className="custom-user-wrapper">
        <img
          height={32}
          width={32}
          className="custom-user-image"
          src={imageSource}
          alt={`Photo de profil de ${user}`} // L'attribut alt est crucial pour l'accessibilité
        />
        <div className={textContainerClassName}>
          <CText
            color={isRow ? 'black' : 'white'}
            size="md_bold"
            // On suppose que votre CText web peut gérer la logique i18n
            text="live.authorComma"
            textOptions={{ author: user }}
          />
        </div>
      </div>
    </>
  );
};
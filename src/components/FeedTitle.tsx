import React from 'react';
// Nous supposons que vous avez une version web de votre composant CText.
import { CText } from '../components/CText';

// --- Styles CSS qui remplacent StyleSheet ---
// Injectés directement dans le DOM via une balise <style>.
const componentStyles = `
  .feed-title-container {
    box-sizing: border-box; /* Assure que le padding n'ajoute pas à la largeur */
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 16px;

    /* Remplace flexDirection, justifyContent, et alignItems */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .feed-title-button {
    /* Réinitialisation du style du bouton pour qu'il ressemble à du texte */
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: inherit; /* Hérite de l'alignement du texte */
  }

  .feed-title-button:hover .ctext-base {
    /* Ajoute un effet de survol pour un meilleur feedback utilisateur */
    text-decoration: underline;
  }
`;

// --- Interface des props pour React JS ---
interface FeedTitleProps {
  title: string; // Simplifié de I18nKeyPath à string
  onClick: () => void; // onPress devient onClick
  mt: number;
  withoutAllButton?: boolean;
}

/**
 * Un composant pour afficher un titre de section avec un bouton optionnel "Tout voir".
 */
export const FeedTitle = ({
  title,
  onClick,
  mt,
  withoutAllButton,
}: FeedTitleProps) => {
  // Les styles dynamiques comme la marge sont appliqués via la prop `style`.
  const containerStyle: React.CSSProperties = {
    marginTop: `${mt}px`,
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="feed-title-container" style={containerStyle}>
        <CText size="lg_extraBold" text={title} />
        
        {!withoutAllButton && (
          // Pressable est remplacé par un <button> pour l'accessibilité
          <button
            type="button" // Empêche la soumission de formulaire
            className="feed-title-button"
            onClick={onClick}
          >
            <CText
              color="black" // Remplacez 'pink700' par une couleur de votre thème web
              size="md_extraBold"
              text="Tout voir" // Remplacez 'common.seeEverything'
            />
          </button>
        )}
      </div>
    </>
  );
};
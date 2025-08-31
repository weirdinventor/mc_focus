import React from 'react';

// Importation des versions web de vos composants
import { EmptyState } from './EmptyState';
import { ChipButton } from './Buttons/ChipButton';

// --- Styles CSS qui remplacent StyleSheet ---
// Injectés via une balise <style> pour garder le composant autonome.
const componentStyles = `
  .empty-state-with-button-container {
    /* Utilise Flexbox pour centrer le contenu verticalement et horizontalement */
    display: flex;
    flex-direction: column; /* Aligne les enfants verticalement */
    justify-content: center; /* Centre sur l'axe vertical */
    align-items: center; /* Centre sur l'axe horizontal */
    flex: 1; /* Prend toute la hauteur disponible dans son conteneur parent */

    /* Ajoute un espacement entre l'EmptyState et le bouton */
    gap: 24px; 
  }
`;

// --- Interface des props pour le web ---
interface EmptyStateWithButtonProps {
  boldText: string; // I18nKeyPath devient string
  smallText: string;
  image?: string;
  onChipClick?: () => void; // onPress devient onClick
  chipText: string; // Il est préférable de passer le texte du bouton en prop
}

/**
 * Affiche un état vide avec un bouton d'action en dessous.
 */
export const EmptyStateWithButton = ({
  boldText,
  smallText,
  image = '/path/to/default/bubble_empty.svg', // Remplacez par le chemin de votre image
  onChipClick,
  chipText,
}: EmptyStateWithButtonProps) => {
  return (
    <>
      <style>{componentStyles}</style>
      <div className="empty-state-with-button-container">
        {/* On suppose que la prop `unFlex` n'est plus nécessaire car le parent gère la disposition */}
        <EmptyState
          boldText={boldText}
          smallText={smallText}
          image={image}
        />
        <ChipButton
          onChipPress={onChipClick ?? (() => {})} // Ensure a function is always passed
          type="colored"
        />
      </div>
    </>
  );
};
import React from 'react';
// En React JS, on importe les images pour obtenir leur URL.
// Assurez-vous que le chemin vers votre image est correct.
import PlayVideoIcon from '../assets/images/play-video.svg'; // ou .png

// --- Les styles CSS qui remplacent StyleSheet ---
// Injectés directement dans le DOM via une balise <style>.
const componentStyles = `
  .video-play-button-wrapper {
    /* Style de base et réinitialisation du bouton */
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    /* Flexbox pour centrer l'icône, remplace justifyContent */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; /* Ajouté pour un centrage horizontal parfait */
  }

  .video-play-button-wrapper img {
    /* Ajoute une transition douce pour l'effet de survol */
    transition: transform 0.2s ease-in-out;
  }

  .video-play-button-wrapper:hover img {
    /* Agrandit légèrement l'icône au survol pour un meilleur feedback utilisateur */
    transform: scale(1.1);
  }
`;

// --- Interface des props pour React JS ---
// On ajoute des props communes du web comme 'onClick' pour rendre le composant fonctionnel.
interface VideoPlayButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string; // Pour l'accessibilité
}

/**
 * Un bouton de lecture vidéo simple pour React JS.
 */
export const VideoPlayButton = ({
  onClick,
  className,
  ariaLabel = 'Lancer la vidéo',
}: VideoPlayButtonProps) => {
  return (
    <>
      <style>{componentStyles}</style>

      {/* 
        On utilise un <button> pour la sémantique et l'accessibilité.
        Il remplace le composant <View> de React Native.
      */}
      <button
        className={`video-play-button-wrapper ${className || ''}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {/*
          Le composant CImage est remplacé par une balise <img> standard.
          L'attribut 'alt' est vide car le bouton a déjà un 'aria-label'.
        */}
        <img
          height={50}
          width={50}
          src={PlayVideoIcon}
          alt=""
        />
      </button>
    </>
  );
};
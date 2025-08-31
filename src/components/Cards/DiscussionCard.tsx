import ImageAssets from './../../assets/images';
import { CText } from './../../components/CText';
import React from 'react'; // useState n'est plus nécessaire

interface DiscussionCardProps {
  name: string;
  coverImage?: string;
  onPress: () => void;
}

export const DiscussionCard = ({
  name,
  coverImage,
  onPress,
}: DiscussionCardProps) => {
  // La gestion de la hauteur via onLayout et useState est supprimée.

  // Détermine la source de l'image
  const imageSource = coverImage ? coverImage : ImageAssets.BG_CLEAN;

  // Crée le style pour l'arrière-plan de manière dynamique
  const bgStyles: React.CSSProperties = {
    ...styles.imgBg,
    backgroundImage: `url(${imageSource})`,
  };

  return (
    // Pressable est remplacé par un <div> avec un gestionnaire onClick.
    // Le style 'container' gère maintenant la taille et le ratio d'aspect.
    <div
      onClick={onPress}
      style={styles.container}
    >
      {/*
        ImageBackground est remplacé par un <div> simple
        qui reçoit les styles de l'arrière-plan.
      */}
      <div style={bgStyles}>
        <CText color="white" size="xxl_black" toUppercase>
          {name}
        </CText>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    // La logique de onLayout (hauteur = 30% de la largeur) est remplacée
    // par la propriété CSS 'aspect-ratio'. (1 / 0.3 = 10 / 3)
    aspectRatio: '10 / 3',
  },
  imgBg: {
    // Les propriétés flexbox nécessitent 'display: flex' sur le web
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Ajouté pour un centrage vertical parfait
    padding: '32px',
    // flex: 1 est remplacé par width et height à 100% pour remplir le parent
    width: '100%',
    height: '100%',
    // resizeMode="cover" est remplacé par backgroundSize et backgroundPosition
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};
import { ChipButton } from './../../components/Buttons/ChipButton';
import { Colors } from './../../constants/Colors';
import { Module } from './../../core/domain/entities/Module';
import { RootStackRoutes } from './../../navigators/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacement de useNavigation

interface ModuleSmallCardProps extends Module {
  isPremium: boolean;
}

export const ModuleSmallCard = ({
  isPremium,
  ...moduleProps
}: ModuleSmallCardProps) => {
  // 1. Remplacer le hook de navigation
  const navigate = useNavigate();

  // 2. Créer le style pour le wrapper qui contiendra l'image de fond
  const wrapperStyle: React.CSSProperties = {
    ...styles.wrapper,
    backgroundImage: `url(${moduleProps.thumbnail})`,
  };

  return (
    // 3. Remplacer View par div
    <div style={styles.container}>
      {/* 4. Remplacer ImageBackground par un div avec le style dynamique */}
      <div style={wrapperStyle}>
        <ChipButton
          onChipPress={() =>
            // 5. Adapter l'appel de navigation pour le web
            navigate(RootStackRoutes.SINGLE_MODULE_SCREEN, {
              state: { moduleId: moduleProps.id },
            })
          }
          type={isPremium ? 'premium' : 'colored'}
          text={isPremium ? 'chipTexts.premiumModule' : 'chipTexts.watch'}
        />
      </div>
    </div>
  );
};

// 6. Convertir StyleSheet en un objet de styles CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '4px',
    // flexBasis est une propriété CSS standard, elle est donc conservée.
    // Cela implique que ce composant doit être un enfant direct d'un conteneur flex.
    flexBasis: '50%',
    boxSizing: 'border-box', // Ajouté pour s'assurer que le padding est inclus dans le flexBasis
  },
  wrapper: {
    gap: '8px',
    height: '168px',
    backgroundColor: Colors.grey8, // Sera visible si l'image ne se charge pas
    borderRadius: '16px',
    padding: '16px',
    overflow: 'hidden',
    // Propriétés de l'image de fond (équivalent de ImageBackground)
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // Propriétés Flexbox pour positionner le bouton en bas
    display: 'flex',
    flexDirection: 'column', // Nécessaire pour que justifyContent s'applique verticalement
    justifyContent: 'flex-end',
  },
};
import { ChipButton } from './../../components/Buttons/ChipButton';
import { InfoChip } from './../../components/InfoChip';
import { LiveDot } from './../../components/LiveDot';
import { Module } from './../../core/domain/entities/Module';
import { RootStackRoutes } from './../../navigators/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacement de useNavigation

interface ModuleCardProps extends Module {
  isPremium: boolean;
}

export const ModuleCard = ({ isPremium, ...moduleProps }: ModuleCardProps) => {
  // 1. Remplacer useNavigation par useNavigate pour le web
  const navigate = useNavigate();

  // 2. Créer dynamiquement le style du conteneur
  const containerStyle: React.CSSProperties = {
    ...styles.container,
    // Appliquer le style conditionnel
    ...(!isPremium && styles.justifyEnd),
    // Appliquer l'image de fond
    backgroundImage: `url(${moduleProps.thumbnail})`,
  };

  return (
    // 3. Remplacer ImageBackground par un div stylisé
    <div style={containerStyle}>
      {isPremium && (
        // 4. Remplacer View par div
        <div style={styles.placesChipContainer}>
          <InfoChip
            LeftAccessory={() => <LiveDot />}
            text="modules.places"
            textOptions={{ amount: 24 }}
          />
        </div>
      )}
      <div style={styles.bottomWrapper}>
        <ChipButton
          onChipPress={() =>
            // 5. Adapter l'appel de navigation pour react-router-dom
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

// 6. Convertir StyleSheet en objet de styles CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    aspectRatio: '1 / 1', // La notation avec '/' est plus standard en CSS
    borderRadius: '16px',
    paddingBottom: '16px',
    overflow: 'hidden',
    // Propriétés de l'ImageBackground
    backgroundSize: '100% 100%', // Équivalent de resizeMode="stretch"
    backgroundPosition: 'center',
    // Propriétés Flexbox pour le layout interne
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  placesChipContainer: {
    // Cette vue est un enfant d'un conteneur flex (column), donc alignItems
    // contrôle l'alignement horizontal.
    alignItems: 'flex-start',
    padding: '16px', // Ajout d'un padding pour un meilleur espacement
  },
  bottomWrapper: {
    display: 'flex',
    gap: '16px',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
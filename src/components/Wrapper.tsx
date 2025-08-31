import React, { JSX, PropsWithChildren } from 'react';

// Pour simuler le changement de thème, nous pourrions utiliser un hook de contexte.
// Pour cet exemple, supposons que nous passons une prop 'theme'.
// import { useTheme } from '../hooks/useTheme'; // Exemple d'un hook de thème

// --- Définition des types pour React JS ---
interface WrapperProps {
  style?: React.CSSProperties; // Remplace containerStyles
  className?: string; // Pour ajouter des classes CSS personnalisées
  fullscreen?: boolean;
  withoutTopEdge?: boolean;
  withoutBottomEdge?: boolean;
  noHorizontalPadding?: boolean;
  theme?: 'light' | 'dark'; // Prop pour simuler le changement de thème
}

type Props = PropsWithChildren<WrapperProps>;

// --- Styles CSS intégrés dans une balise <style> ---
// Cela remplace StyleSheet.create et garde les styles dans le même fichier.
const wrapperStyles = `
  /* Styles de base pour le conteneur principal */
  .wrapper-container {
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out; /* Remplace Animated.View */
    display: flex;
    flex-direction: column;
  }

  /* Thème clair (par défaut) */
  .wrapper-container.light {
    background-color: #F5F5F4; /* Similaire à Colors.whiteSand50 */
  }

  /* Thème sombre */
  .wrapper-container.dark {
    background-color: #121212; /* Similaire à Colors.backgroundBlack */
  }

  /* Gère le mode "fullscreen" */
  .wrapper-container.fullscreen {
    min-height: 100vh;
  }

  /* Conteneur intérieur qui simule SafeAreaView */
  .safe-area-view {
    flex: 1;
    width: 100%;
    max-width: 1200px; /* Optionnel: largeur maximale pour les grands écrans */
    margin: 0 auto; /* Centre le contenu */
    padding: 16px; /* Padding par défaut, simule le safe area */
  }

  /* Gère noHorizontalPadding */
  .safe-area-view.no-horizontal-padding {
    padding-left: 0;
    padding-right: 0;
  }
  
  /* Gère withoutTopEdge */
  .safe-area-view.no-top-edge {
    padding-top: 0;
  }

  /* Gère withoutBottomEdge */
  .safe-area-view.no-bottom-edge {
    padding-bottom: 0;
  }
`;

/**
 * Un composant Wrapper pour la mise en page, converti pour React JS.
 * Il utilise des classes CSS pour gérer la disposition et le thème.
 */
export const Wrapper = ({
  children,
  style,
  className,
  fullscreen = false,
  withoutTopEdge = false,
  withoutBottomEdge = false,
  noHorizontalPadding = false,
  theme = 'light', // La valeur du thème pourrait venir d'un hook de contexte
}: Props): JSX.Element => {
  // const { theme } = useTheme(); // Utilisation typique avec un hook

  // Construction dynamique des noms de classes pour le conteneur principal
  const containerClassNames = [
    'wrapper-container',
    theme, // Applique la classe 'light' ou 'dark'
    fullscreen ? 'fullscreen' : '',
  ].filter(Boolean).join(' ');

  // Construction dynamique des noms de classes pour la "safe area"
  const safeAreaClassNames = [
    'safe-area-view',
    noHorizontalPadding ? 'no-horizontal-padding' : '',
    withoutTopEdge ? 'no-top-edge' : '',
    withoutBottomEdge ? 'no-bottom-edge' : '',
    className, // Ajoute les classes personnalisées passées en props
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Intègre les styles directement dans le DOM */}
      <style>{wrapperStyles}</style>

      {/* Remplace Animated.View */}
      <main
        className={containerClassNames}
        data-testid="wrapper-container" // 'data-testid' est l'équivalent de 'testID' pour le web
      >
        {/* Remplace SafeAreaView */}
        <div
          className={safeAreaClassNames}
          style={style} // Applique les styles en ligne personnalisés
          data-testid="wrapper-safe-area"
        >
          {children}
        </div>
      </main>
    </>
  );
};
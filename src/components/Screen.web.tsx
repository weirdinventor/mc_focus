import React, { useRef, PropsWithChildren, JSX } from 'react';

// --- Mock de constantes (à remplacer par vos vraies valeurs) ---
const Colors = {
  whiteSand50: '#FDFBF5',
  buttons: { primaryBorder: '#DDDDDD' },
  white: '#FFFFFF',
  primaryBlack: '#333333',
};
const TestIDs = { tests: { Screen: { AnimatedView: 'screen-container' } } };

// --- Styles CSS pour le composant Screen ---
const componentStyles = `
  .screen-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: ${Colors.whiteSand50};
  }

  .screen-web-header {
    padding: 16px;
    border-bottom: 1px solid ${Colors.buttons.primaryBorder};
    background-color: ${Colors.white};
    flex-shrink: 0; /* Empêche le header de rétrécir */
  }

  .screen-header-title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: ${Colors.primaryBlack};
  }

  .screen-content-wrapper {
    flex: 1; /* Prend toute la hauteur restante */
    overflow-y: auto; /* C'est ce qui remplace ScrollView */
    -webkit-overflow-scrolling: touch; /* Défilement fluide sur iOS */
  }

  .screen-content-container {
    padding: 20px 16px;
  }
`;

// --- Interface des props ---
interface ScreenProps {
  children: React.ReactNode;
  containerStyles?: React.CSSProperties;
  noHorizontalPadding?: boolean;
  withoutTopPadding?: boolean;
  withoutBottomPadding?: boolean;
  headerText?: string;
  headerWithBack?: boolean;
}

/**
 * Composant Screen principal pour les applications web, gère la disposition et le défilement.
 */
export const Screen = ({
  children,
  containerStyles,
  noHorizontalPadding = false,
  withoutTopPadding = false,
  withoutBottomPadding = false,
  headerText,
  headerWithBack,
}: PropsWithChildren<ScreenProps>): JSX.Element => {
  // Le ref pointe maintenant vers un élément HTML standard
  const scrollRef = useRef<HTMLDivElement>(null);

  const contentPadding = {
    paddingLeft: noHorizontalPadding ? 0 : '16px',
    paddingRight: noHorizontalPadding ? 0 : '16px',
    paddingTop: withoutTopPadding ? 0 : '20px',
    paddingBottom: withoutBottomPadding ? 0 : '20px',
  };

  return (
    <>
      <style>{componentStyles}</style>
      <main className="screen-container" data-testid={TestIDs.tests.Screen.AnimatedView}>
        {(headerText || headerWithBack) && (
          <header className="screen-web-header">
            {/* TODO: Implémenter un vrai composant Header ici */}
            <h1 className="screen-header-title">{headerText}</h1>
          </header>
        )}

        {/* Ce div remplace ScrollView */}
        <div
          ref={scrollRef}
          className="screen-content-wrapper"
          style={{ ...contentPadding, ...containerStyles }}
        >
          {children}
        </div>
      </main>
    </>
  );
};
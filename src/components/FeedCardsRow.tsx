import React, { ComponentType } from 'react';
// Remplacement pour la navigation
import { useNavigate } from 'react-router-dom';

// Import des versions web de vos composants
import { FeedTitle } from './FeedTitle';
import { EmptyState } from './EmptyState';
// L'import d'image sera une chaîne de caractères URL
// import cameraVideoIcon from '../assets/images/camera-video.svg';

// --- Styles CSS qui remplacent StyleSheet ---
const componentStyles = `
  .feed-row-wrapper {
    width: 100%;
    margin-bottom: 16px; /* Ajout d'un espacement en bas */
  }

  .scroll-container {
    /* C'est ici que la magie du défilement horizontal opère */
    display: flex;
    overflow-x: auto; /* Affiche une barre de défilement si le contenu dépasse */
    padding-bottom: 16px; /* Espace pour la barre de défilement pour ne pas coller au contenu */
    
    /* Pour cacher la barre de défilement visuellement (comme showsHorizontalScrollIndicator={false}) */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
  }

  .scroll-container::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .scroll-content {
    /* Ce conteneur interne gère l'espacement entre les cartes */
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 0 24px; /* Simule paddingHorizontal */
  }
`;

// --- Interface des props pour le web ---
interface FeedCardRowProps<T> {
  data: T[];
  headerTitle: string; // I18nKeyPath devient string
  RenderCard: ComponentType<{ item: T; index: number }>;
  emptyImage?: string;
  // La navigation est simplifiée pour le web
  navigationPath?: string;
  withoutAllButton?: boolean;
}

/**
 * Affiche une ligne de cartes défilant horizontalement, convertie pour React JS.
 */
export const FeedCardRow = <T,>({
  data,
  headerTitle,
  RenderCard,
  navigationPath,
  emptyImage = '/path/to/default/image.svg', // Remplacez par votre image par défaut
  withoutAllButton,
}: FeedCardRowProps<T>) => {
  // Le hook de navigation pour le web
  const navigate = useNavigate();

  const handleSeeAllClick = () => {
    if (navigationPath) {
      // La navigation sur le web est plus simple, on passe juste le chemin
      navigate(navigationPath);
    }
  };

  return (
    <>
      <style>{componentStyles}</style>
      <section className="feed-row-wrapper">
        <FeedTitle
          mt={24}
          onClick={handleSeeAllClick}
          title={headerTitle}
          withoutAllButton={withoutAllButton || !navigationPath}
        />
        {data && data.length > 0 ? (
          <div className="scroll-container">
            <div className="scroll-content">
              {data.map((item, index) => (
                // L'utilisation de l'index comme clé n'est pas idéale si la liste peut changer.
                // Préférez un identifiant unique de `item` si disponible (ex: key={item.id})
                <RenderCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            boldText="Rien à voir pour le moment" // Remplacez par vos clés i18n
            smallText="Revenez plus tard pour découvrir du nouveau contenu."
            image={emptyImage}
          />
        )}
      </section>
    </>
  );
};
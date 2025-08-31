import React from 'react';

// --- Styles CSS pour le composant SearchInput ---
const componentStyles = `
  .search-input-container {
    display: flex;
    align-items: center;
    height: 56px;
    background-color: #f0f0f0; /* Couleur de fond par défaut */
    border-radius: 8px; /* Un peu de bord arrondi */
    padding: 0 16px;
  }

  .search-input-icon {
    margin-right: 12px;
    color: #888888; /* Colors.grey6 */
  }

  .search-input-field {
    flex: 1; /* Prend tout l'espace restant */
    height: 100%;
    border: none;
    background: transparent;
    font-size: 16px;
    outline: none; /* Supprime le contour bleu au focus */
  }
`;

// --- Icône de recherche SVG (remplace react-native-easy-icon) ---
// Utiliser des SVGs directement est une excellente pratique sur le web.
const SearchIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="search-input-icon"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);


// --- Interface des props ---
interface SearchInputProps {
  setTextValue: (text: string) => void;
  placeholder?: string; // Ajout d'une prop placeholder pour la flexibilité
}

/**
 * Un composant de barre de recherche pour React JS.
 */
export const SearchInput = ({
  setTextValue,
  placeholder = 'Rechercher...'
}: SearchInputProps) => {
  // En React JS, l'événement `onChange` pour un input
  // donne accès à l'objet événement `e`.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="search-input-container">
        <SearchIcon />
        <input
          type="search" // Le type 'search' est sémantique et ajoute une croix pour effacer
          className="search-input-field"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
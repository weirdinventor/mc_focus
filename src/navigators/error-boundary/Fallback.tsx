import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { CText } from '../../components/CText'; // Importez la version React JS de CText
import './Fallback.css'; // Nous allons créer ce fichier CSS

/**
 * Composant Fallback pour afficher une interface utilisateur en cas d'erreur.
 */
export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="fallback-container" role="alert">
    <CText as="h2" size="lg_bold" mb={20}>
      Une erreur est survenue
    </CText>

    {/*
      Nous utilisons un `pre` pour préserver le formatage du message d'erreur,
      ce qui peut être utile pour le débogage.
    */}
    <pre className="error-message">
      <CText size="sm_medium">{error.message}</CText>
    </pre>

    <button className="retry-button" onClick={resetErrorBoundary}>
      <CText size="md_medium" color="white">
        Réessayer
      </CText>
    </button>
  </div>
);
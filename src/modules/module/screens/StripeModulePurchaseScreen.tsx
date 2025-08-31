import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CText } from './../../../components/CText';
import { Screen } from './../../../components/Screen'; // Assuming this is converted to a web component
import { Colors } from './../../../constants/Colors';
import { useStripePayments } from './../../../hooks/useStripePayments';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';

import { StripeLoadingOverlay } from '../../onboarding/components/StripeLoadingOverlay'; // Assuming this is converted

interface ModulePurchaseInfo {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  image?: string;
}

const MODULE_PURCHASE_DATA: ModulePurchaseInfo = {
  id: 'module_premium_course',
  name: 'Course Premium',
  description:
    'Accédez à ce module exclusif avec du contenu premium et des exercices avancés.',
  price: 19.99,
  currency: 'EUR',
  features: [
    'Contenu exclusif',
    'Exercices avancés',
    'Support prioritaire',
    'Certificat de completion',
  ],
};

// Component props are simplified as navigation is handled by a hook
export const StripeModulePurchaseScreen = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: user } = useGetMeQuery();
  const navigate = useNavigate(); // Web navigation hook

  const {
    createPaymentIntent,
    isLoading: isStripeLoading,
    error: stripeError,
    resetError,
  } = useStripePayments();

  const moduleData = MODULE_PURCHASE_DATA;

  const handlePurchase = async () => {
    if (!user) {
      // Use window.alert for web; a modal or toast is better for production
      window.alert('Connexion requise: Vous devez être connecté pour effectuer un achat.');
      return;
    }

    try {
      setIsProcessing(true);
      resetError();

      const result = await createPaymentIntent({
        amount: moduleData.price,
        currency: moduleData.currency.toLowerCase(),
        userId: user.id,
        description: `Achat du module: ${moduleData.name}`,
        metadata: {
          moduleId: moduleData.id,
          moduleName: moduleData.name,
          type: 'module_purchase',
        },
      });

      if (result.success) {
        window.alert('Achat réussi ! Votre achat a été traité avec succès.');
        navigate(-1); // Go back to the previous page
      } else {
        window.alert(`Erreur de paiement: ${result.error || 'Une erreur est survenue.'}`);
      }
    } catch (error) {
      console.error('Erreur achat module:', error);
      window.alert("Erreur: Une erreur est survenue lors de l'achat. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isLoading = isStripeLoading || isProcessing;

  return (
    // Assuming <Screen> is converted to a div-based layout component
    <Screen headerWithBack containerStyles={styles.container}>
      {/* Scrollable content area */}
      <div style={styles.scrollContainer}>
        <header style={styles.header}>
          <CText color="white" size="xl_bold" style={styles.moduleTitle}>
            {moduleData.name}
          </CText>
          <CText color="grey" size="md" style={styles.moduleDescription}>
            {moduleData.description}
          </CText>
        </header>

        <div style={styles.priceContainer}>
          <p style={styles.priceLabel}>Prix</p>
          <p style={styles.price}>
            {moduleData.price.toFixed(2)} {moduleData.currency}
          </p>
        </div>

        <div style={styles.featuresContainer}>
          <h3 style={styles.featuresTitle}>Ce qui est inclus :</h3>
          {moduleData.features.map((feature, index) => (
            <div key={index} style={styles.featureRow}>
              <span style={styles.featureDot} />
              <p style={styles.featureText}>{feature}</p>
            </div>
          ))}
        </div>

        <div style={styles.legalContainer}>
          <p style={styles.legalText}>
            En procédant à l'achat, vous acceptez nos conditions d'utilisation
            et notre politique de confidentialité.
          </p>
        </div>
      </div>

      {/* Fixed purchase button footer */}
      <footer style={styles.purchaseButtonContainer}>
        {stripeError && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{stripeError}</p>
          </div>
        )}
        <button
          style={{ ...styles.purchaseButton, ...(isLoading && styles.loadingButton) }}
          onClick={handlePurchase}
          disabled={isLoading}
        >
          <span style={styles.purchaseButtonText}>
            {isLoading ? 'Traitement...' : `Acheter pour ${moduleData.price.toFixed(2)} ${moduleData.currency}`}
          </span>
        </button>
      </footer>

      {isLoading && (
        <StripeLoadingOverlay message="Traitement du paiement..." visible={isLoading} />
      )}
    </Screen>
  );
};

// Styles are now a CSS-in-JS object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Ensure the container takes full viewport height
    backgroundColor: Colors.primaryBlack,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    paddingBottom: '120px', // Ensure space for the fixed footer
  },
  header: {
    marginBottom: 32,
  },
  moduleTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  moduleDescription: {
    textAlign: 'center',
    lineHeight: '1.5',
  },
  priceContainer: {
    backgroundColor: Colors.black40,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    border: `2px solid ${Colors.seance700}`,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.grey8,
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.seance700,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
  },
  featureRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: Colors.seance700,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  legalContainer: {
    // This space is now managed by the scroll container's paddingBottom
  },
  legalText: {
    fontSize: 12,
    color: Colors.grey8,
    textAlign: 'center',
    lineHeight: '1.5',
    opacity: 0.7,
  },
  purchaseButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryBlack,
    padding: '20px',
    borderTop: `1px solid ${Colors.grey8}30`,
  },
  errorContainer: {
    backgroundColor: `${Colors.red}20`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    border: `1px solid ${Colors.red}`,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    fontSize: 14,
  },
  purchaseButton: {
    backgroundColor: Colors.seance700,
    borderRadius: 12,
    padding: '16px',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
  },
  loadingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
};
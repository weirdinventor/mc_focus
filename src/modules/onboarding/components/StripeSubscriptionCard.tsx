import React from "react";
import { Colors } from "./../../../constants/Colors";

export interface SubscriptionPlan {
  id: string;
  priceId?: string;
  title: string;
  price: string;
  currency?: string;
  interval?: string;
  features: string[];
  isPopular?: boolean;
}

interface StripeSubscriptionCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
  onSubscribe: () => void;
  isLoading?: boolean;
  isFree?: boolean;
}

export const StripeSubscriptionCard: React.FC<StripeSubscriptionCardProps> = ({
  plan,
  isSelected,
  onSelect,
  onSubscribe,
  isLoading = false,
  isFree = false,
}) => {
  const handlePress = () => {
    if (isFree) {
      onSubscribe();
    } else {
      onSelect();
    }
  };

  const handleSubscribe = () => {
    if (!isFree && isSelected) {
      onSubscribe();
    }
  };

  return (
    <div
      onClick={handlePress}
      style={{
        ...styles.container,
        ...(isSelected ? styles.selectedContainer : {}),
        ...(plan.isPopular ? styles.popularContainer : {}),
        ...(isFree ? styles.freeContainer : {}),
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {plan.isPopular && (
        <div style={styles.popularBadge}>
          <span style={styles.popularText}>Populaire</span>
        </div>
      )}

      <div style={styles.header}>
        <h3
          style={{
            ...styles.title,
            color: isFree ? Colors.grey8 : Colors.white,
          }}
        >
          {plan.title}
        </h3>

        {!isFree && (
          <div style={styles.priceContainer}>
            <span style={styles.price}>{plan.price}€</span>
            {plan.interval && (
              <span style={styles.interval}>
                /{plan.interval === "month" ? "mois" : "an"}
              </span>
            )}
          </div>
        )}
      </div>

      <div style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <div key={index} style={styles.featureRow}>
            <div style={styles.featureDot} />
            <span
              style={{
                ...styles.featureText,
                color: isFree ? Colors.grey8 : Colors.white,
              }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      {!isFree && isSelected && (
        <button
          style={{
            ...styles.subscribeButton,
            ...(isLoading ? styles.loadingButton : {}),
          }}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? "..." : "S'abonner"}
        </button>
      )}

      {isFree && (
        <button
          style={{
            ...styles.freeButton,
            ...(isLoading ? styles.loadingButton : {}),
          }}
          onClick={onSubscribe}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Continuer gratuitement"}
        </button>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: Colors.black40,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.transparent,
    position: "relative",
    transition: "all 0.2s ease-in-out",
  },
  selectedContainer: {
    borderColor: Colors.seance700,
    backgroundColor: Colors.black60,
  },
  popularContainer: {
    borderColor: Colors.seance700,
    backgroundColor: Colors.black60,
  },
  freeContainer: {
    backgroundColor: Colors.white + "10",
    borderColor: Colors.grey8 + "40",
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    left: 20,
    backgroundColor: Colors.seance700,
    padding: "4px 12px",
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.seance700,
  },
  interval: {
    opacity: 0.7,
    fontSize: 14,
    color: Colors.grey8,
  },
  featuresContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: 20,
  },
  featureRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: Colors.seance700,
  },
  featureText: {
    flex: 1,
    opacity: 0.9,
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: Colors.seance700,
    borderRadius: 12,
    padding: "14px",
    width: "100%",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    border: "none",
    cursor: "pointer",
  },
  loadingButton: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  freeButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.seance700,
    borderRadius: 12,
    padding: "14px",
    width: "100%",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.seance700,
    cursor: "pointer",
  },
};

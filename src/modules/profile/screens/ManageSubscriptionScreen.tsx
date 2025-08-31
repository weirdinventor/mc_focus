import React from 'react';
import { Screen } from './../../../components/Screen';
import { Colors } from './../../../constants/Colors';
import {
  useCurrentUserSubscriptionStatus,
  useCancelStripeSubscription,
} from './../../../react-query/stripeQueries';

import { queryClient } from './../../../react-query/queryClient';
import { userFactory } from './../../../react-query/queries/queryFactory';
import { openLink } from './../../../utils/openLink';

interface Subscription {
  subscriptionId: string;
  status: string;
  priceId: string;
  currentPeriodStart: string | number | Date;
  currentPeriodEnd: string | number | Date;
}

const formatDate = (date: string | number | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatPrice = (priceId: string): string => {
  const priceMap: Record<string, string> = {
    price_1RtUyf04Urg8zeEvskSULleK: '9,99€/mois',
  };
  return priceMap[priceId] || 'Prix non défini';
};

const getStatusText = (status: string): { text: string; color: string } => {
  switch (status) {
    case 'active':
      return { text: 'Actif', color: Colors.green };
    case 'incomplete':
      return { text: 'En attente de paiement', color: Colors.grey6 };
    case 'canceled':
      return { text: 'Résilié', color: Colors.deepRed };
    case 'past_due':
      return { text: 'Paiement en retard', color: Colors.deepRed };
    case 'unpaid':
      return { text: 'Impayé', color: Colors.deepRed };
    default:
      return { text: status, color: Colors.grey1 };
  }
};

export const ManageSubscriptionScreen: React.FC = () => {
  

  const { data, isLoading } = useCurrentUserSubscriptionStatus();
  const cancelMutation = useCancelStripeSubscription();

  const subscriptionData = data?.success ? data.data : null;
  const subscriptions = subscriptionData?.subscriptions || [];

  const onCancelSubscription = async (subId: string) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir résilier ? Vous conserverez l'accès jusqu'à la fin de la période en cours."
    );
    if (!confirmed) return;

            const res = await cancelMutation.mutateAsync(subId);
            if (res.success) {
      await queryClient.invalidateQueries({ queryKey: userFactory.getMe().queryKey });
      await queryClient.invalidateQueries({ queryKey: ['stripe', 'current-user-subscription'] });
      window.alert('Votre abonnement a été résilié.');
            } else {
      window.alert(res.error || "Impossible d'annuler l'abonnement.");
            }
  };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onManageSubscriptionOnStripe = (_subId: string) => {
    openLink(`https://billing.stripe.com/p/login/test_00000000000000`);
  };

const renderSubscriptionCard = (sub: Subscription, index: number) => {
  const statusInfo = getStatusText(sub.status);

  return (
    <div key={sub.subscriptionId} style={styles.subscriptionCard}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>Abonnement #{index + 1}</span>
        <span style={{ ...styles.statusBadge, backgroundColor: statusInfo.color }}>
          {statusInfo.text}
        </span>
      </div>

      <div style={styles.subscriptionDetails}>
        <div style={styles.detailRow}>
          <span style={styles.labelText}>Plan:</span>
          <span style={styles.priceText}>{formatPrice(sub.priceId)}</span>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.labelText}>Période:</span>
          <div style={styles.periodContainer}>
            <span style={styles.periodText}>Du {formatDate(sub.currentPeriodStart)}</span>
            <span style={styles.periodText}>Au {formatDate(sub.currentPeriodEnd)}</span>
          </div>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.smallLabelText}>ID:</span>
          <span style={styles.subscriptionId}>{sub.subscriptionId}</span>
        </div>
      </div>

      <div style={styles.cardActions}>
        <button
          style={styles.manageButton}
          onClick={() => onManageSubscriptionOnStripe(sub.subscriptionId)}
        >
          Gérer sur Stripe
        </button>
        {sub.status === 'active' && (
          <button
            style={styles.cancelButton}
            onClick={() => onCancelSubscription(sub.subscriptionId)}
          >
            Résilier
          </button>
        )}
      </div>
    </div>
  );
};


  return (
    <Screen containerStyles={{ padding: 16 }}>
      <h1 style={styles.title}>Gestion des abonnements</h1>

      {isLoading ? (
        <div style={styles.card}>
          <span style={styles.loadingText}>Chargement...</span>
        </div>
      ) : subscriptions.length === 0 ? (
        <div style={styles.card}>
          <div style={styles.noSubscriptionContainer}>
            <span style={styles.noSubscriptionText}>Aucun abonnement trouvé</span>
            <span style={styles.noSubscriptionSubtext}>
              Souscrivez à un abonnement pour accéder à toutes les fonctionnalités premium.
            </span>
          </div>
        </div>
      ) : (
        <div style={{ ...styles.subscriptionsContainer, overflowY: 'auto' }}>
          {subscriptions.map(renderSubscriptionCard)}
        </div>
      )}

      {data?.error && (
        <div style={styles.card}>
          <span style={styles.errorText}>{data.error}</span>
        </div>
      )}
    </Screen>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.primaryBlack, marginBottom: 20, marginTop: 10 },
  subscriptionsContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
  subscriptionCard: { border: '1px solid #E5E5E5', borderRadius: 12, padding: 16, backgroundColor: Colors.backgroundWhite, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.primaryBlack },
  statusBadge: { padding: '4px 12px', borderRadius: 16, color: Colors.backgroundWhite, fontWeight: 600 },
  subscriptionDetails: { marginTop: 12 },
  detailRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E5E5E5' },
  labelText: { fontSize: 14, color: Colors.primaryBlack, fontWeight: 500, flex: 1 },
  priceText: { fontSize: 14, color: Colors.primaryBlack, fontWeight: 600, flex: 2, textAlign: 'right' },
  periodContainer: { flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  periodText: { fontSize: 12, color: Colors.grey6, textAlign: 'right' },
  smallLabelText: { fontSize: 12, color: Colors.grey6, flex: 1 },
  subscriptionId: { fontSize: 10, color: Colors.grey6, fontFamily: 'monospace', flex: 2, textAlign: 'right' },
  cardActions: { display: 'flex', gap: 8, marginTop: 16 },
  manageButton: { flex: 1, backgroundColor: Colors.seance700, padding: '12px 16px', borderRadius: 8, color: Colors.backgroundWhite, fontWeight: 600, cursor: 'pointer', border: 'none' },
  cancelButton: { flex: 1, backgroundColor: Colors.deepRed, padding: '12px 16px', borderRadius: 8, color: Colors.backgroundWhite, fontWeight: 600, cursor: 'pointer', border: 'none' },
  card: { border: '1px solid #E5E5E5', borderRadius: 12, padding: 16, backgroundColor: Colors.backgroundWhite, marginBottom: 16 },
  loadingText: { fontSize: 14, color: Colors.grey6, marginTop: 8, textAlign: 'center' },
  noSubscriptionContainer: { marginTop: 8 },
  noSubscriptionText: { fontSize: 14, color: Colors.grey6, fontWeight: 500 },
  noSubscriptionSubtext: { fontSize: 12, color: Colors.grey6, marginTop: 8 },
  errorText: { fontSize: 14, color: Colors.deepRed, marginTop: 8, textAlign: 'center' },
};

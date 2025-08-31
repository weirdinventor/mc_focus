// Deprecated: IAP flow removed. This stub remains temporarily to avoid breaking imports.
export type Subscription = { productId: string };

const DEFAULT_PRICE = '0';

export const useSubscriptions = () => {
  const getSubscriptionPrice = (_sub: Subscription): string => DEFAULT_PRICE;
  const handleBuySubscription = async (
    _productId: string,
    _offerToken?: string,
  ) => {
    // no-op
    return;
  };

  return {
    subscriptions: [] as Subscription[],
    getSubscriptionPrice,
    ownedSubscriptions: [] as string[],
    handleBuySubscription,
    executingPayment: false,
    subBoughtSuccessfuly: false,
  };
};

import { CONSTANTS } from './../config/Configuration';

interface SubscriptionResponse {
  status: Status[];
}
interface Status {
  state: string;
}

export const useSubscriptionStatus = () => {
  const checkSubscription = (email: string): Promise<boolean> => {
    return fetch(CONSTANTS.EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONSTANTS.EXTERNAL_API_KEY,
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: SubscriptionResponse) => {
        console.log('Subscription status:', data);
        if (data.status.at(0)?.state === 'En Cours') {
          console.log('subscribed');
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Error checking subscription:', err);

        return false;
      });
  };

  return {
    checkSubscription,
  };
};

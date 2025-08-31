import { useState } from 'react';

export const useManualRefresh = (refetch: () => Promise<unknown>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async () => {
    setIsRefreshing(true);

    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refresh, isRefreshing };
};

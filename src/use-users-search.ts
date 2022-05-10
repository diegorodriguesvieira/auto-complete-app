import { useApiClient } from 'api-client/use-api-client';
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
}

export function useUsersSearch(
  query: string,
  options: {
    enabled?: boolean;
    orderBy?: 'asc' | 'desc';
    sortBy?: keyof User;
  },
) {
  const apiClient = useApiClient();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Array<User>>([]);

  const { orderBy = 'asc', sortBy = 'name', enabled = true } = options;

  useEffect(() => {
    let didCancel = false;

    async function searchUsers() {
      try {
        if (!didCancel) {
          setIsLoading(true);
        }
        const users = await apiClient<Array<User>>(
          `/users?name=${query}&sortBy=${sortBy}&order=${orderBy}`,
        );
        if (!didCancel) {
          setData(users);
        }
      } catch (error) {
        if (!didCancel) {
          setData([]);
        }
      } finally {
        if (!didCancel) {
          setIsLoading(false);
        }
      }
    }

    if (enabled) {
      searchUsers();
    } else {
      setData([]);
    }

    return () => {
      didCancel = true;
    };
  }, [apiClient, enabled, query, orderBy, sortBy]);

  return {
    data,
    isLoading,
  };
}

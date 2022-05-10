import { useCallback } from 'react';
import { apiClient, Endpoint, Config } from './api-client';

export function useApiClient() {
  return useCallback(
    <T>(endpoint: Endpoint, config: Config = {}) =>
      apiClient<T>(endpoint, config),
    [],
  );
}

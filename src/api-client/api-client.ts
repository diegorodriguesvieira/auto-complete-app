const apiURL = process.env.REACT_APP_API_URL;

export type Endpoint = RequestInfo | URL;
export type Config = RequestInit;

async function apiClient<T>(
  endpoint: Endpoint,
  config: Config = {},
): Promise<T> {
  return window.fetch(`${apiURL}${endpoint}`, config).then(async (response) => {
    const data = (await response.json()) as Promise<T>;
    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
}

export { apiClient };

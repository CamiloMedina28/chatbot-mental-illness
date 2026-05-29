// This centralizes environment values to keep infrastructure config explicit.
export const env = {
  apiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080',
};

// Generic HTTP contract used by gateways to avoid direct fetch coupling.
export interface HttpClient {
  get<T>(path: string, token?: string): Promise<T>;
  post<TRequest, TResponse>(path: string, body: TRequest, token?: string): Promise<TResponse>;
}

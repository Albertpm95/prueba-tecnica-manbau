import { environment } from 'environments/environments';

export const CATALOGOS_API = {
  base: `${environment.apiUrl}`,
  estados: () => `${CATALOGOS_API.base}/estados`,
  prioridades: () => `${CATALOGOS_API.base}/priorities`,
};

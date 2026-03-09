import { environment } from 'environments/environments';

export const TICKET_API = {
  base: `${environment.apiUrl}/tickets`,
  list: () => `${TICKET_API.base}`,
  detail: (id: number) => `${TICKET_API.base}/${id}`,
  create: () => `${TICKET_API.base}`,
  update: (id: number) => `${TICKET_API.base}/${id}`,
};
export const USERS_API = {
  base: `${environment.apiUrl}/users`,
  list: () => `${USERS_API.base}`,
  detail: (id: number) => `${USERS_API.base}/${id}`,
  create: () => `${USERS_API.base}`,
};
export const CATALOGOS_API = {
  base: 'http://localhost:3000',
  estados: () => `${CATALOGOS_API.base}/estados`,
  prioridades: () => `${CATALOGOS_API.base}/priorities`,
};

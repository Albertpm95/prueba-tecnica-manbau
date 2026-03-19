import { environment } from 'environments/environments';

export const TICKET_API = {
  base: `${environment.apiUrl}/tickets`,
  list: () => `${TICKET_API.base}`,
  detail: (id: string) => `${TICKET_API.base}/${id}`,
  create: () => `${TICKET_API.base}`,
  update: (id: string) => `${TICKET_API.base}/${id}`,
};

import { environment } from 'environments/environments';

export const TICKET_API = {
  base: `${environment.apiUrl}/tickets`,
  list: () => `${TICKET_API.base}`,
  detail: (id: number) => `${TICKET_API.base}/${id}`,
  create: () => `${TICKET_API.base}`,
  update: (id: number) => `${TICKET_API.base}/${id}`,
};

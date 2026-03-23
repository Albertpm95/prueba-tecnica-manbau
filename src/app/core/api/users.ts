import { environment } from '@env/environments';

export const USERS_API = {
  base: `${environment.apiUrl}/users`,
  list: () => `${USERS_API.base}`,
  detail: (id: number) => `${USERS_API.base}/${id}`,
  create: () => `${USERS_API.base}`,
};

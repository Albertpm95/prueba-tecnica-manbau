export const TICKET_API = {
  base: 'http://localhost:3000/tickets',
  list: () => `${TICKET_API.base}`,
  detail: (id: number) => `${TICKET_API.base}/${id}`,

};
export const CATALOGOS_API = {
    base: 'http://localhost:3000',
    estados: () => `${CATALOGOS_API.base}/estados`,
    prioridades: () => `${CATALOGOS_API.base}/priorities`
}

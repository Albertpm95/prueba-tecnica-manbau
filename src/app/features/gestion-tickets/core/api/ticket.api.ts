export const TICKET_API = {
    base: 'http://localhost:3000/tickets',
    list: () => `${TICKET_API.base}`,
    detail: (id: number) => `${TICKET_API.base}/${id}`,
    create: () => `${TICKET_API.base}`,
    update: (id: number) => `${TICKET_API.base}/${id}`
};
export const USERS_API = {
    base: 'http://localhost:3000/',
    list: () => `${USERS_API.base}/users`,
    detail: (id: number) => `${USERS_API.base}/${id}`,
    create: () => `${USERS_API.base}/users`
}
export const CATALOGOS_API = {
    base: 'http://localhost:3000',
    estados: () => `${CATALOGOS_API.base}/estados`,
    prioridades: () => `${CATALOGOS_API.base}/priorities`
}

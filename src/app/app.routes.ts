import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'gestion-tickets',
    loadComponent: () => import('./features/gestion-tickets/gestion-tickets.page').then(m => m.GestionTicketsPage)
  },
  {
    path: '',
    redirectTo: 'gestion-tickets',
    pathMatch: 'full'
  }
];

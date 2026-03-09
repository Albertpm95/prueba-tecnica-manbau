import { Routes } from '@angular/router';
import { GestionTicketsFacade } from './features/gestion-tickets/facade/gestion-tickets.facade';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'gestion-tickets',
    providers: [GestionTicketsFacade],
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/gestion-tickets/gestion-tickets.page').then(
            (m) => m.GestionTicketsPage,
          ),
      },
      {
        path: 'detalle/:id',
        loadComponent: () =>
          import('./features/gestion-tickets/components/smart/detail-tickets/detail-tickets.component').then(
            (m) => m.DetailTicketsComponent,
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./shared/pages/sin-usuario').then((m) => m.NoAuthComponent),
    pathMatch: 'full',
  },
];

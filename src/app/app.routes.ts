import { Routes } from '@angular/router';
import { GestionTicketsFacade } from './features/gestion-tickets/facade/gestion-tickets.facade';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'gestion-tickets',
    providers: [GestionTicketsFacade],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/gestion-tickets/gestion-tickets.page').then(m => m.GestionTicketsPage)
      },
      {
        path: 'detalle',
        loadComponent: () => import('./features/gestion-tickets/components/smart/detail-tickets/detail-tickets.component').then(m => m.DetailTicketsComponent)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'gestion-tickets',
    pathMatch: 'full'
  }
];


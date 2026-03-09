import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1 style="color: red; padding: 20px;">Error: No tienes permisos. Por favor, loguéate.</h1>
  `,
})
export class NoAuthComponent {}

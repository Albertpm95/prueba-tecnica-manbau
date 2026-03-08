import { Component, OnInit } from '@angular/core';
import { FormularioBaseComponent } from './formulario-base.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-lectura',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.css']
})
export class FormularioLecturaComponent extends FormularioBaseComponent  {
    override isReadOnly = true;
}
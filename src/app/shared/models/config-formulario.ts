import { ValidatorFn } from "@angular/forms";
import { CatalogoDTO } from "shared/dtos/catalogo.dto";

export interface ConfigControl {
    oculto?: boolean; // Si el control está oculto, no se muestra en el formulario
    columnas?: string // Tailwind, numero de columnas que ocupa el control
    tipo: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio';
    nombre: string; // Nombre del control, usado para el formControlName
    label: string; // Etiqueta que se muestra al usuario
    opciones?: CatalogoDTO[]; // Solo para select, checkbox y radio
    disabled?: boolean; // Si el control está deshabilitado
    validators?: ValidatorFn[]; // Validadores específicos para este control
    readonly?: boolean; // Si el control es de solo lectura (no editable pero visible)
    placeholder?: string; // Texto de placeholder para inputs y textareas
    value?: null | string | number | boolean; // Valor inicial del control, puede ser null para vacío, o un valor específico
}
export interface ConfigFormulario {
    controles: ConfigControl[]
    validators: ValidatorFn[]; // Validadores a nivel de formulario, por ejemplo para validar que un campo sea requerido si otro tiene cierto valor
}
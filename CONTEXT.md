# Reglas del Proyecto (Prueba Técnica)
- **OS:** CachyOS (Linux/Arch). Priorizar `pnpm`.
- **Hardware:** 32GB RAM.

## Arquitectura de Carpetas (Estricta)
- `/src/app/layout`: Componentes globales persistentes (Header, Footer).
- `/src/app/core`: Lógica global (Auth, Interceptors, Guards). Solo Singletons.
- `/src/app/shared`: UI reutilizable y utilidades puras.
- `/src/app/features`: Módulos aislados. Cada uno con:
  - `core/api/`: URLs/Endpoints.
  - `core/services/`: Llamadas HTTP.
  - `facade/`: Orquestador de lógica y estado.
  - `components/smart/`: Lógica de negocio y validaciones.
  - `components/dumb/`: Presentación pura (inputs/outputs).
  - `models/`: Interfaces en **camelCase**.
  - `dtos/`: Interfaces en **snake_case**.
  - `mappers/`: Funciones `DTO (snake) <-> Model (camel)`.

# Angular Moderno (v21+)
- **Signals:** Usar `signal()`, `computed()` y `effect()` para la reactividad en lugar de solo BehaviorSubjects cuando sea posible.
- **Control Flow:** Prohibido usar `*ngIf`, `*ngFor` o `*ngSwitch`. Usar exclusivamente la nueva sintaxis:
  - `@if (condition) { ... } @else { ... }`
  - `@for (item of items; track item.id) { ... }`
- **Componentes:** Todos los componentes deben ser `standalone: true`.

### Componentes de Navegación/Estado
- Los componentes de autenticación en el header (Avatar/Login) residen en `layout`.
- El estado de la sesión se consume desde `core/services/auth.service`.


## Convenciones de Nomenclatura
- **Backend/Mocks (`db.json` y DTOs):** Usar siempre `snake_case`.
- **Frontend (TS, Variables, Models, Componentes):** Usar siempre `camelCase`.
- **Mappers:** Es obligatorio transformar cada respuesta del "backend" de snake a camel.
- **Inyección de Dependencias:** Usar siempre la función `inject()` en lugar del constructor para servicios y utilidades.
  - *Ejemplo:* `private readonly authService = inject(AuthService);`
- **Visibilidad de Métodos y Propiedades:**
  - **`public`**: Obligatorio para todo lo que se consuma desde el HTML (template).
  - **`private`**: Obligatorio para lógica interna, servicios inyectados y helpers que no se usen en el template.
- **Tipado Estricto:** Evitar el uso de `any`. Definir interfaces para todo (usar la carpeta `models` y `dtos`).
- **Estilos:** Priorizar clases de Tailwind CSS incluso en estilos inline para mantener consistencia.
- **Mappers:** Preferir funciones puras exportadas en lugar de clases con métodos estáticos para la transformación de DTOs a Modelos.
- **Transformación:** Realizar conversiones de tipos (ej. string a Date) dentro del mapper para que el resto de la app trabaje con tipos nativos. El backend utiliza timestamp en UTC.
- **Forms:** Prohibido usar Template-driven Forms (ngModel). 
  - Usar exclusivamente **Reactive Forms** tipados.
  - Inyectar `FormBuilder` mediante `inject(FormBuilder)`.
  - Vincular valores de formularios a **Signals** mediante `valueChanges` cuando sea necesario para la UI.


- **Consumo de Datos en el Template:**
  - Prohibido llamar a métodos de servicios directamente en las expresiones del template (ej. `{{ service.getData() }}`).
  - Los datos deben almacenarse en variables del componente o ser consumidos como Observables usando el pipe `| async`.
  - Para valores calculados, usar variables que se actualicen en el componente o, preferiblemente, **Angular Signals** si la versión lo permite.

## Calidad y CI/CD
- **Git Hooks:** Husky + lint-staged para formateo automático (Prettier) y Linting (ESLint) en cada commit.
- **CI:** GitHub Actions para validar builds en cada push.

## Tecnologías y Librerías
- **Mock Backend:** `json-server` sobre el archivo `db.json`.

## Comandos rápidos
- Instalación: `pnpm add ngx-translate @ngx-translate/http-loader ngx-spinner ngx-toastr @angular/animations`
- Mock Server: `pnpm exec json-server --watch db.json --port 3000 --delay 500`
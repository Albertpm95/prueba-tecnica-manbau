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

## Convenciones de Nomenclatura
- **Backend/Mocks (`db.json` y DTOs):** Usar siempre `snake_case`.
- **Frontend (TS, Variables, Models, Componentes):** Usar siempre `camelCase`.
- **Mappers:** Es obligatorio transformar cada respuesta del "backend" de snake a camel.

## Calidad y CI/CD
- **Git Hooks:** Husky + lint-staged para formateo automático (Prettier) y Linting (ESLint) en cada commit.
- **CI:** GitHub Actions para validar builds en cada push.

## Tecnologías y Librerías
- **Internacionalización:** `ngx-translate` (usar pipe `| translate` en plantillas).
- **Feedback Visual:** - `ngx-spinner` para estados de carga.
  - `ngx-toastr` para notificaciones de éxito/error.
- **Mock Backend:** `json-server` sobre el archivo `db.json`.

## Comandos rápidos
- Instalación: `pnpm add ngx-translate @ngx-translate/http-loader ngx-spinner ngx-toastr @angular/animations`
- Mock Server: `pnpm exec json-server --watch db.json --port 3000 --delay 500`
# PruebaTecnica

# Uso de la IA.
 - Gemini para preguntas iniciales y ayuda para la creacion del fichero CONTEXT.md para el chat de copilot.
 - Gemini para revisar los ficheros finales de README y CONTEXT.
 - Gemini para rellenar de datos el db.json
 - Gemini para crear y configurar algo de ci/cd y formateo basico con husky y lint-staged

# Dependencias
Angualar 21, la version estable mas moderna
ngx-toastr para notificar llamadas al backend
ngx-translate para centralizar textos
ngx-spinner para informar de peticiones en curso
tailwind para los estilos
husky y lint-staged

Yo he utilizado pnpm para instalar y arrancar en servidor, pero npm deberia funcionar igual

- Mock Server: `pnpm exec json-server --watch db.json --port 3000 --delay 500` o con npm: `xxxxx` 

- ng serve para arrancar el frontal en local

Solo utilizo un fichero de environments para la prueba tecnica pero en una aplicacion real añadiria uno para cada entorno (Desa, Pre y Pro y se actualizarian en el angular.json)
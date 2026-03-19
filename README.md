# PruebaTecnica

# Uso de la IA.
 - Gemini para preguntas iniciales y ayuda para la creacion del fichero CONTEXT.md para el chat de copilot.
 - Gemini para revisar los ficheros finales de README y CONTEXT.
 - Gemini para rellenar de datos el db.json
 - Gemini para crear y configurar algo de ci/cd y formateo basico con husky y lint-staged
 - Gemini para discutir la creacion de un componente especifico para el layout (usuario)
 - Copilot para la gestion del usuario. 
 - Copilot para creacion de estructura segun lo planteado en el Context.md
 - Gemini para realizar una ultima refactorizacion de la estructura de carpetas moviendo la logica de usuarios (login) y catalogos a Core ya que es transversal a la aplicación.

# Paginacion
He elegido hacerlo en el lado del servidor porque al final la bbdd siempre va a ser mas eficiente con grandes cantidades de datos

# Auth Service recupera y guarda en sessonstorage el token y rol
# Interceptor inyecta el token en cada peticion
# Guard comprueba si tiene rol especifico

# Dependencias
Angualar 21, la version estable mas moderna
tailwind para los estilos
husky y lint-staged

Yo he utilizado pnpm para instalar y arrancar en servidor, pero npm deberia funcionar igual

- npm run mock-server para levantar el json-server.

- ng serve para arrancar el frontal en local

Solo utilizo un fichero de environments para la prueba tecnica pero en una aplicacion real añadiria uno para cada entorno (Desa, Pre y Pro y se actualizarian en el angular.json)
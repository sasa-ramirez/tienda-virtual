# Contexto del Proyecto — Tienda Virtual E-commerce

> Este documento resume el estado actual del proyecto para continuar el desarrollo en una nueva conversación con Claude, sin perder contexto técnico.

## Sobre el proyecto

Tienda virtual (E-commerce) full stack, construida como proyecto de aprendizaje y portafolio profesional. El objetivo es aprender desarrollo Full Stack mientras se construye una aplicación real, con mentoría paso a paso (formato: qué vamos a hacer → por qué → cómo funciona → código → explicación línea por línea → buenas prácticas → errores comunes → ejercicio → confirmación antes de avanzar).

**Repositorio:** `github.com/sasa-ramirez/tienda-virtual` (rama `main`)
**Sistema operativo:** Windows 10 Pro, ThinkPad X280
**Terminal estándar del proyecto:** Git Bash (NO PowerShell, NO CMD)
**Editor:** VS Code

## Stack tecnológico confirmado

- **Backend:** Node.js (v22.19.0) + Express 5 + ES Modules (`"type": "module"` en package.json)
- **Gestor de paquetes:** pnpm (NO npm) — versión 11.10.0, elegido por protecciones de seguridad en cadena de suministro (bloqueo de scripts, cooldown de 24h)
- **ORM:** Prisma 6.19.3 (NO v7 — se hizo downgrade deliberado porque v7 requiere arquitectura de "adapters" más compleja, lanzada muy recientemente, con documentación/comunidad aún inmadura)
- **Base de datos:** PostgreSQL, corriendo en un contenedor Docker (`postgres-tienda`, puerto 5432)
- **Autenticación:** JWT (`jsonwebtoken`) + bcrypt
- **Validación:** express-validator
- **Frontend (aún no iniciado):** React + Vite + Tailwind CSS + React Router DOM + Axios

## Infraestructura local (ya resuelta, no debería requerir más trabajo)

- Docker Desktop instalado y funcionando (se resolvió un problema de virtualización: BIOS tenía VT-x activado, pero `bcdedit hypervisorlaunchtype` estaba en `Off` — se corrigió con `bcdedit /set hypervisorlaunchtype auto` + reinicio)
- WSL2 instalado con Ubuntu
- **IMPORTANTE:** cada vez que se reinicia la PC, hay que volver a activar el contenedor de Postgres:
  ```bash
  docker start postgres-tienda
  ```
- SSH configurado con GitHub (llave ya autorizada, `git@github.com:sasa-ramirez/tienda-virtual.git`)

## Estructura de carpetas

```
tienda-virtual/
├── backend/
│   ├── src/
│   │   ├── config/prisma.js          (instancia única de PrismaClient - patrón singleton)
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    (verificarToken, verificarRol)
│   │   │   └── validacion.middleware.js
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env (no versionado — contiene DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, PORT)
│   └── package.json
├── frontend/          (vacío todavía)
├── database/
└── docs/
```

## Arquitectura de código (patrón aplicado en CADA módulo)

```
Route → Validator → Middleware de validación → (Auth Middleware si aplica) → Controller → Service → Repository → Prisma → PostgreSQL
```

- **Repository:** único lugar que llama a Prisma directamente. Nunca contiene lógica de negocio.
- **Service:** lógica de negocio pura (sin conocer HTTP). Puede llamar a otros services (ej: `producto.service` llama a `categoria.service`). Errores se lanzan con `error.statusCode` adjunto.
- **Controller:** delgado — extrae `req.body`/`req.params`/`req.query`, llama al service, formatea respuesta. Siempre responde con formato estándar:
  ```json
  { "success": true/false, "message": "...", "data": {...} }
  ```
- **Convención de eliminación:** soft-delete (`activo: false`) para Categoría y Producto (valor histórico). Eliminación física (`.deleteMany()`) para Favorito (sin valor histórico).

## Modelo de datos (Prisma schema — 15 tablas, todas migradas)

Modelos ya definidos y migrados en PostgreSQL: `Rol`, `Usuario`, `Categoria`, `Producto`, `ImagenProducto`, `Direccion`, `Carrito`, `DetalleCarrito`, `Pedido`, `DetallePedido`, `Favorito`, `Resena` (sin ñ en el código, mapeada a `"reseñas"` en BD vía `@@map`), `Cupon`, `MovimientoInventario`, más enums `EstadoPedido` y `TipoMovimiento`.

Notas de diseño importantes:
- Precios siempre `Decimal @db.Decimal(10,2)`, nunca `Float` (evita errores de redondeo)
- `DetalleCarrito` y `DetallePedido` "congelan" el precio al momento de la operación (no referencian el precio actual del producto)
- Roles ya creados en BD: `admin` = id 1, `cliente` = id 2

## Estado del Backend — Fase 1: **100% completa**

Módulos construidos y probados end-to-end en Postman:

1. **Usuarios/Auth** (`/api/usuarios`):
   - `POST /registro` (con validaciones, bcrypt hash)
   - `POST /login` (bcrypt.compare + genera JWT con payload `{id, correo, rolId}`)
   - `GET /perfil` (protegida, usa `verificarToken`)

2. **Categorías** (`/api/categorias`) — CRUD completo:
   - Lectura pública, escritura protegida (`verificarRol(1)` = solo admin)
   - Genera `slug` automáticamente desde el nombre (función `generarSlug` con regex, sin librería externa)

3. **Productos** (`/api/productos`) — CRUD completo:
   - Lectura pública (con filtros por `categoriaId` y `busqueda` vía query params), escritura protegida
   - Valida que la categoría exista antes de crear/actualizar
   - `PATCH /:id/inventario` — ajusta stock con `increment`/`decrement` atómico, registra automáticamente en `MovimientoInventario`

4. **Dashboard** (`/api/dashboard/resumen`) — protegido, solo admin:
   - Usa `Promise.all()` para ejecutar 5 counts en paralelo (totalProductos, totalCategorias, totalUsuarios, productosStockBajo, totalPedidos)

5. **Favoritos** (`/api/favoritos`) — protegido, cualquier usuario autenticado (no requiere rol específico):
   - `usuarioId` siempre se toma de `req.usuario.id` (del token), nunca del body/params — evita que un usuario gestione favoritos de otro
   - `router.use(authMiddleware.verificarToken)` aplica el middleware a todas las rutas del archivo de una vez

## Middleware de autenticación (`auth.middleware.js`)

```javascript
verificarToken(req, res, next)      // valida JWT del header Authorization: Bearer <token>, adjunta payload a req.usuario
verificarRol(...rolesPermitidos)    // factory de middleware: verificarRol(1) = solo admin, verificarRol(1,2) = admin o cliente
```

Constante usada en rutas: `const ROL_ADMIN = 1;`

## Pendiente del Backend (no bloqueante para empezar frontend)

- Fase 2: Cloudinary (subida de imágenes), pasarela de pagos, historial de pedidos, correos automáticos, recuperar contraseña
- Fase 3: IA recomendaciones, sistema de puntos, cupones (tabla ya existe, sin lógica), dashboard avanzado, reportes PDF
- Endpoints de Carrito y Pedidos (tablas ya existen en el schema, sin repository/service/controller todavía)
- Endpoint de Reseñas (tabla ya existe, sin lógica todavía)

## Errores ya resueltos (para no repetir diagnóstico si reaparecen)

- **Mojibake en PowerShell** (`Ã±`, `Ã³`): solo visual, el archivo real en VS Code está en UTF-8 correcto. No requiere acción.
- **Confusión de rutas Git**: recordar `pwd` antes de `git add/commit/push` — el repo raíz es `tienda-virtual/`, no `backend/` ni `proyectos/`.
- **Contenedor Docker se detiene al reiniciar Windows**: siempre correr `docker start postgres-tienda` antes de trabajar.
- Un episodio donde `usuario.repository.js` fue sobrescrito accidentalmente con el contenido de `categoria.repository.js` — ya resuelto, pero sirve como recordatorio de verificar contenido de archivos con `cat` antes de asumir que están bien.

## Próximo paso planeado

Iniciar el **Frontend en React + Vite + Tailwind**, consumiendo los endpoints ya construidos (empezando probablemente por login/registro y el catálogo público de productos).

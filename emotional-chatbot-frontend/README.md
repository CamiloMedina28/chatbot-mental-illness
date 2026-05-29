# Emotional Chatbot Frontend (Astro + TypeScript)

Frontend modular para el backend `emotional-chatbot-backend`, construido con Astro, React y Tailwind CSS.

## 1. Requisitos

- Node.js 22+
- pnpm 11+

## 2. Instalación

```bash
pnpm install
pnpm approve-builds --all
```

## 3. Variables de entorno

Crear `.env` en este directorio:

```env
PUBLIC_API_BASE_URL=http://localhost:8080
```

## 4. Ejecutar

```bash
pnpm dev
```

## 5. Build de producción

```bash
pnpm build
pnpm preview
```

## 6. Endpoints esperados del backend

- `POST /auth/register`
- `POST /auth/login`
- `POST /conversations/analyze` (requiere JWT Bearer)
- `GET /conversations/history` (requiere JWT Bearer)

## 7. Arquitectura y patrones

Estructura por capas con separación de responsabilidades:

- `src/domain`: modelos y contratos.
- `src/infrastructure`: cliente HTTP, gateways y token storage.
- `src/application`: servicios, comandos, fábrica, eventos y estrategias.
- `src/presentation`: store, hooks y componentes de UI.

Patrones implementados:

- Factory: `AppFactory` crea y compone dependencias.
- Observer: `EventBus` sincroniza eventos de sesión e historial.
- Command: comandos para login, registro, análisis e historial.
- Strategy: `EmotionPresentationStrategy` decide estilos por emoción.

## 8. Principios SOLID aplicados

- SRP: cada módulo hace una sola cosa (UI, estado, transporte, dominio).
- OCP: nuevas emociones o gateways se extienden sin romper módulos existentes.
- LSP: implementaciones de contratos (`AuthGateway`, `ConversationGateway`) son intercambiables.
- ISP: interfaces pequeñas y específicas por capacidad.
- DIP: servicios dependen de abstracciones, no de `fetch` ni `localStorage` directos.

## 9. Nota ética

La UI muestra explícitamente el mensaje de no diagnóstico clínico para alinear el frontend con el objetivo académico del proyecto.

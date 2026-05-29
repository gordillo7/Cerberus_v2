# Cerberus v2 - React Migration

Migración exitosa de Cerberus a **React 18** con **TypeScript**, **Vite** y **TailwindCSS**.

## 📋 Cambios Principales

### Frontend
- ✅ **React 18** con TypeScript para type safety
- ✅ **Vite** para compilación ultra-rápida (14.98s build time)
- ✅ **TailwindCSS** para estilos modernos y responsive
- ✅ **React Router v6** para navegación SPA
- ✅ **Lucide Icons** para iconografía consistente
- ✅ **Axios** para llamadas HTTP
- ✅ **React Hot Toast** para notificaciones
- ✅ **Zustand** para state management (instalado, listo para usar)

### Componentes
```
src/
├── components/
│   ├── Common/         # Button, Card, Input, etc.
│   ├── Dashboard/      # Panel principal
│   ├── Projects/       # CRUD de proyectos
│   ├── Scanner/        # Control de escaneos
│   ├── Reports/        # Gestión de reportes
│   ├── Settings/       # Configuración y tokens
│   └── Layout/         # Sidebar y Header
├── services/           # Integración API
├── hooks/              # useTheme y custom hooks
├── context/            # ThemeContext para tema claro/oscuro
├── types/              # TypeScript interfaces
└── styles/             # TailwindCSS global styles
```

### Backend (Flask)
Sin cambios en la lógica. Solo se actualiza para servir la SPA React:
- Flask sigue siendo la API REST en `/api/*`
- Actualizado para servir archivos estáticos desde `frontend/dist`
- Maneja rutas de la SPA automáticamente

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 18+ y npm
- Python 3.8+ y Flask
- Las dependencias de `requirements.txt`

### Setup Local

#### 1. Instalar dependencias backend
```bash
pip install -r requirements.txt
```

#### 2. Instalar y compilar frontend
```bash
cd frontend
npm install
npm run build  # Compilar para producción
cd ..
```

#### 3. Ejecutar en desarrollo

**Terminal 1 - Backend Flask:**
```bash
python app.py
# Accede a http://localhost:5000
```

**Terminal 2 - Frontend (hot reload):**
```bash
cd frontend
npm run dev
# Accede a http://localhost:5173
```

**Nota:** El frontend en desarrollo usa proxy automático a `/api` en `localhost:5000`

## 📦 Build para Producción

```bash
cd frontend
npm run build
cd ..
python app.py
```

La carpeta `frontend/dist` contiene todos los archivos compilados. Flask los servirá automáticamente en `/`.

## 🎨 Características de UI

### Temas
- **Dark Mode** (por defecto) y Light Mode
- Toggle en la barra lateral
- Persistencia en localStorage

### Componentes Reutilizables
- `Button` - Múltiples variantes (primary, secondary, danger, outline)
- `Card` - Contenedor base con estilos
- `StatCard` - Para mostrar métricas
- `Input` - Con validación integrada
- `Textarea` - Área de texto
- `Select` - Dropdowns

### Layout
- Sidebar responsive con navegación
- Header con título de página
- Mobile-friendly (hamburger menu)
- Scroll suave automático en logs

## 🔌 Integración API

Todos los endpoints Flask existentes funcionan igual:

```javascript
// Ejemplos de uso
import { projectsAPI, statsAPI, settingsAPI } from '@/services/api';

// Obtener estadísticas
const stats = await statsAPI.getStats();

// Crear proyecto
const project = await projectsAPI.createProject({ 
  name: 'Audit 2024', 
  target: 'https://example.com' 
});

// Guardar token
await settingsAPI.setGeminiToken('sk-...');
```

## 📝 Estructura de Proyecto

```
cerberus-v2/
├── frontend/                  # Aplicación React
│   ├── src/
│   ├── dist/                  # Build compilado
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
├── static/                    # (Deprecated) Antiguos assets
├── templates/                 # (Deprecated) Antiguos HTML
├── app.py                     # Flask actualizado
├── main.py                    # Lógica de escaneo (sin cambios)
├── requirements.txt
└── modules/                   # Módulos de seguridad (sin cambios)
```

## 🔄 Migración desde v1

Si vienes de la versión anterior:

1. **Datos:** Todos tus reportes, proyectos y configuraciones se preservan
2. **API:** Los endpoints API son 100% compatibles
3. **Backend:** Sin cambios en la lógica de escaneo
4. **Frontend:** Completamente reescrito pero con las mismas funcionalidades

## ⚙️ Scripts Disponibles

En el directorio `frontend/`:

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build para producción
npm run lint     # Ejecutar ESLint
npm run preview  # Previsualizar build local
```

## 🎯 Próximos Pasos (Opcionales)

- [ ] Agregar tests con Jest + React Testing Library
- [ ] Implementar notificaciones en tiempo real con WebSockets
- [ ] Agregar gráficos con Chart.js o Recharts
- [ ] Autenticación y autorización
- [ ] PWA para funcionar offline

## 📊 Performance

- **Build time:** ~15s (vs. webpack: 2-3min)
- **Bundle size:** 246KB (JavaScript) + 14.8KB (CSS)
- **Gzip:** 81.5KB + 3.5KB
- **Hot Module Reload (HMR):** Instantáneo

## 🐛 Troubleshooting

### "Cannot find module '@/...'"
- Asegúrate de ejecutar desde `frontend/` con `npm run dev`
- O ejecutar `npm run build` antes de iniciar Flask

### Flask no encuentra `frontend/dist`
- Ejecuta `npm run build` en el directorio `frontend/`
- Verifica que `frontend/dist` contiene `index.html`

### Puertos en conflicto
- Flask por defecto: `http://localhost:5000`
- Vite por defecto: `http://localhost:5173`
- Cambiar en `app.py` line 555 o `frontend/vite.config.ts`

## 📄 Licencia

[Tu licencia aquí]

---

**Creado con ❤️ usando React + TypeScript + Vite**

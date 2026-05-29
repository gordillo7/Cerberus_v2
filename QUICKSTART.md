# 🐕‍🦺 Cerberus v2 - Guía de Inicio Rápido

## ⚡ TL;DR (5 minutos)

```bash
# En la carpeta del proyecto:
cd frontend && npm install && npm run build && cd ..
python app.py
```

Accede a **http://localhost:5000**

---

## 📖 Guía Completa

### 1️⃣ Instalar Dependencias

```bash
# Backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
cd ..
```

### 2️⃣ Desarrollo Local

**Opción A: Modo Producción (Simplificado)**
```bash
cd frontend
npm run build
cd ..
python app.py
```
- Accede a `http://localhost:5000`
- La UI está estática pero funcional

**Opción B: Modo Desarrollo (Con Hot Reload)**

Terminal 1:
```bash
python app.py
```

Terminal 2:
```bash
cd frontend
npm run dev
```
- Accede a `http://localhost:5173` (frontend)
- Cambios en el código se reflejan al instante
- El backend API en `http://localhost:5000` está disponible vía proxy

### 3️⃣ Compilar para Producción

```bash
cd frontend
npm run build
```

Archivos compilados en `frontend/dist/` listos para deployment.

---

## 🎯 Estructura del Proyecto

```
cerberus-v2/
├── app.py                  # API Flask + Servidor SPA
├── main.py                 # Lógica de escaneo
├── requirements.txt        # Dependencias Python
├── REACT_MIGRATION.md      # Documentación detallada
├── dev.bat                 # Script para Windows
├── dev.sh                  # Script para Linux/Mac
│
└── frontend/               # 🎨 Aplicación React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── services/       # Integración API
    │   ├── types/          # TypeScript types
    │   └── main.tsx        # Punto de entrada
    ├── dist/               # ⚡ Compilado (generado)
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── tailwind.config.js
```

---

## 🔌 API Endpoints

Todos los endpoints existentes funcionan igual. Ejemplos:

```bash
# Obtener estadísticas
curl http://localhost:5000/api/stats

# Listar proyectos
curl http://localhost:5000/api/projects

# Iniciar escaneo
curl -X POST http://localhost:5000/fullscan \
  -F "target=http://example.com" \
  -F "scanType=regular"
```

---

## 🎨 Componentes Disponibles

### Páginas
- **Dashboard** `/` - Panel principal con estadísticas
- **Projects** `/projects` - CRUD de proyectos
- **Scanner** `/scanner` - Interfaz de escaneo
- **Reports** `/reports` - Gestión de reportes
- **Settings** `/settings` - Configuración y tokens

### Componentes Reutilizables
```tsx
import { Button, Card, Input } from '@/components/Common';
import { useThemeContext } from '@/context/ThemeContext';

export const MyComponent = () => {
  const { theme, toggleTheme } = useThemeContext();
  
  return (
    <Card>
      <Button onClick={() => console.log('Click!')}>Click me</Button>
      <Input label="Tu nombre" placeholder="Juan..." />
    </Card>
  );
};
```

---

## 🚨 Troubleshooting

| Problema | Solución |
|----------|----------|
| `Cannot find module '@/...'` | Ejecuta `npm run build` en `frontend/` primero |
| Flask no sirve el frontend | Verifica que `frontend/dist/index.html` existe |
| Puerto 5000 en uso | Cambia en `app.py` línea 555: `app.run(port=8000)` |
| Puertos de desarrollo | Vite: 5173, Flask: 5000 (configurables) |

---

## 📊 Estadísticas de Build

| Métrica | Valor |
|---------|-------|
| **Build Time** | ~15 segundos |
| **JavaScript** | 246 KB (81.5 KB gzip) |
| **CSS** | 14.79 KB (3.51 KB gzip) |
| **Total Size** | ~260 KB |

---

## 🔄 Migración desde v1

✅ **Qué se preserva:**
- Todos los reportes y datos (carpetas `reports/`, `projects/`)
- Configuración de tokens (`config/api_tokens.json`)
- Lógica de escaneo completa

✅ **Qué cambió:**
- Interfaz completamente rediseñada con React
- Build system modernizado (Vite)
- TypeScript para type safety

---

## 📚 Recursos

- [Documentación Completa](REACT_MIGRATION.md)
- [React 18 Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## 🎓 Próximos Pasos

- [ ] Agregar tests
- [ ] Websockets para logs en tiempo real
- [ ] Gráficos de vulnerabilidades
- [ ] Autenticación
- [ ] Dark/Light mode selector mejorado

---

**¿Preguntas?** Revisa [REACT_MIGRATION.md](REACT_MIGRATION.md) para más detalles.

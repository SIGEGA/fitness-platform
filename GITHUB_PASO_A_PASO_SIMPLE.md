# 🔧 PREPARAR GITHUB - GUÍA SUPER SIMPLE

## Vamos paso a paso, sin complicaciones

---

## PASO 1: CREAR CARPETAS EN TU COMPUTADORA

### Opción A: Si usas Windows (Click derecho)

```
📁 Escritorio
   └─ Click derecho
      └─ Nueva carpeta
         └─ "fitness-platform"
```

Luego dentro de fitness-platform:

```
📁 fitness-platform
   ├─ Click derecho → Nueva carpeta → "backend"
   └─ Click derecho → Nueva carpeta → "frontend"
```

### Opción B: Si usas Mac/Linux (Terminal)

```bash
mkdir fitness-platform
cd fitness-platform
mkdir backend
mkdir frontend
```

**Resultado final:**
```
fitness-platform/
├── backend/
└── frontend/
```

---

## PASO 2: COPIAR ARCHIVOS DEL BACKEND

### ¿Cómo copiar un archivo?

**Abre el archivo `FITPRO_CODIGO_BACKEND.md` que descargaste**

Verás algo como:

```
═══════════════════════════════════
## ARCHIVO 1: backend/package.json

```json
{
  "name": "fitness-platform-backend",
  "version": "1.0.0",
  ...
}
```
═══════════════════════════════════
```

### Qué haces:

1. **Copia todo lo que está entre los backticks (```json ... ```)
2. **Abre tu computadora → carpeta fitness-platform → carpeta backend**
3. **Click derecho → Nuevo archivo → Llamalo `package.json`**
4. **Pega el contenido adentro**
5. **Guarda (Ctrl+S)**

**Ejemplo visual:**

```
ARCHIVO DESCARGADO:           TU COMPUTADORA:
┌─────────────────────┐       ┌─────────────────────┐
│ FITPRO_CODIGO_      │       │ fitness-platform/   │
│ BACKEND.md          │   →   │ └─ backend/         │
│                     │       │    └─ package.json  │
│ Copiar este texto:  │       │    └─ .env          │
│ {                   │       │    └─ server.js     │
│   "name": "...      │       │    └─ ... (más)     │
│ }                   │       └─────────────────────┘
└─────────────────────┘
```

### Repite para CADA archivo del backend

**Del archivo `FITPRO_CODIGO_BACKEND.md`, copias:**

```
✅ ARCHIVO 1: backend/package.json
   └─ Copia el contenido JSON
   └─ Crea archivo en backend/
   └─ Pega el contenido
   └─ Guarda

✅ ARCHIVO 2: backend/.env
   └─ Copia el contenido
   └─ Crea archivo en backend/ llamado ".env"
   └─ Pega
   └─ Guarda

✅ ARCHIVO 3: backend/.gitignore
   └─ Mismo proceso...

✅ ARCHIVO 4: backend/Procfile
   └─ Mismo proceso...

✅ ARCHIVO 5: backend/server.js
   └─ Mismo proceso...

✅ ARCHIVO 6: backend/models/User.js
   └─ Primero crea carpeta "models" dentro de backend/
   └─ Luego crea User.js dentro de models/
   └─ Pega contenido
   └─ Guarda

✅ ARCHIVO 7: backend/models/Exercise.js
   └─ Crea en backend/models/
   └─ Pega
   └─ Guarda

✅ ARCHIVO 8: backend/models/WorkoutProgram.js
   └─ Crea en backend/models/
   └─ Pega
   └─ Guarda

✅ ARCHIVO 9: backend/models/WorkoutLog.js
   └─ Crea en backend/models/
   └─ Pega
   └─ Guarda

✅ ARCHIVO 10: backend/routes/auth.js
   └─ Primero crea carpeta "routes" dentro de backend/
   └─ Luego crea auth.js dentro de routes/
   └─ Pega contenido
   └─ Guarda
```

**Al final tu backend debe verse así:**

```
backend/
├── package.json ✅
├── .env ✅
├── .gitignore ✅
├── Procfile ✅
├── server.js ✅
├── models/ (carpeta)
│   ├── User.js ✅
│   ├── Exercise.js ✅
│   ├── WorkoutProgram.js ✅
│   └── WorkoutLog.js ✅
└── routes/ (carpeta)
    └── auth.js ✅
```

---

## PASO 3: COPIAR ARCHIVOS DEL FRONTEND

**Abre el archivo `FITPRO_CODIGO_FRONTEND.md`**

Misma idea: copia cada bloque en su archivo correspondiente.

**Del archivo `FITPRO_CODIGO_FRONTEND.md`, copias:**

```
✅ ARCHIVO 1: frontend/package.json
✅ ARCHIVO 2: frontend/.env
✅ ARCHIVO 3: frontend/.gitignore
✅ ARCHIVO 4: frontend/public/index.html
✅ ARCHIVO 5: frontend/src/index.js
✅ ARCHIVO 6: frontend/src/index.css
✅ ARCHIVO 7: frontend/src/services/api.js
✅ ARCHIVO 8: frontend/src/components/ProtectedRoute.js
✅ ARCHIVO 9: frontend/src/components/Navigation.js
✅ ARCHIVO 10: frontend/src/App.js
✅ ARCHIVO 11: frontend/src/pages/LoginPage.js
✅ ARCHIVO 12: frontend/src/pages/RegisterPage.js
✅ ARCHIVO 13: frontend/src/pages/TrainerDashboard.js
✅ ARCHIVO 14: frontend/src/pages/ClientDashboard.js
```

**Al final tu frontend debe verse así:**

```
frontend/
├── package.json ✅
├── .env ✅
├── .gitignore ✅
├── public/ (carpeta)
│   └── index.html ✅
└── src/ (carpeta)
    ├── index.js ✅
    ├── index.css ✅
    ├── App.js ✅
    ├── services/ (carpeta)
    │   └── api.js ✅
    ├── components/ (carpeta)
    │   ├── ProtectedRoute.js ✅
    │   └── Navigation.js ✅
    └── pages/ (carpeta)
        ├── LoginPage.js ✅
        ├── RegisterPage.js ✅
        ├── TrainerDashboard.js ✅
        └── ClientDashboard.js ✅
```

---

## PASO 4: CREAR .gitignore EN LA RAÍZ

**En la carpeta principal `fitness-platform/` (NO dentro de backend o frontend)**

Crea un archivo llamado `.gitignore` con este contenido:

```
node_modules/
.env
.env.local
.DS_Store
build/
dist/
*.log
```

**Estructura completa ahora:**

```
fitness-platform/
├── .gitignore ← AQUÍ
├── backend/
│   ├── package.json
│   └── ...
└── frontend/
    ├── package.json
    └── ...
```

---

## PASO 5: ABRIR TERMINAL/CMD

### Windows:
1. Abre tu carpeta `fitness-platform`
2. Click derecho en el espacio vacío
3. "Abrir PowerShell aquí" o "Abrir CMD aquí"

### Mac:
1. Abre Terminal (Applications → Utilities → Terminal)
2. Escribe: `cd` y arrastra la carpeta `fitness-platform` a la terminal
3. Presiona Enter

### Linux:
1. Click derecho en la carpeta
2. "Abrir en Terminal"

---

## PASO 6: COMANDOS EN TERMINAL

### Copia y pega cada comando uno por uno:

```bash
# Comando 1: Inicializar git
git init

# Comando 2: Agregar todos los archivos
git add .

# Comando 3: Hacer commit (guardar versión)
git commit -m "Initial commit - FitPro platform"

# Comando 4: Agregar conexión con GitHub
# ⚠️ REEMPLAZA TU_USUARIO con tu usuario real de GitHub
git remote add origin https://github.com/TU_USUARIO/fitness-platform.git

# Comando 5: Cambiar rama a main
git branch -M main

# Comando 6: Subir a GitHub
git push -u origin main
```

---

## ¿CÓMO PEGAR COMANDOS EN LA TERMINAL?

1. **Copia el comando** (Ctrl+C en Windows/Linux o Cmd+C en Mac)
2. **Click derecho en la terminal**
3. **Selecciona "Paste"** (o Ctrl+V)
4. **Presiona Enter**

---

## VERIFICAR QUE FUNCIONÓ

1. Abre tu navegador
2. Ve a: `https://github.com/TU_USUARIO/fitness-platform`
3. Deberías ver **todos tus archivos** allí ✅

Si aparecen tus archivos en GitHub → **¡Lo hiciste bien!**

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "git is not recognized"
**Solución:** Instala Git desde https://git-scm.com/

### Error: "fatal: not a git repository"
**Solución:** Asegúrate de estar en la carpeta `fitness-platform/`

```bash
# Ver dónde estás
pwd  (Mac/Linux)
cd   (Windows)

# Cambiar a la carpeta correcta
cd fitness-platform
```

### Error: "Permission denied to user"
**Solución:** Verifica que el usuario sea correcto:
```
https://github.com/TU_USUARIO/fitness-platform.git
```

### Los archivos no aparecen en GitHub
**Solución:** Espera 30 segundos y recarga la página

---

## ✅ CHECKLIST

```
□ Creé carpeta fitness-platform
□ Creé subcarpetas backend/ y frontend/
□ Copié 10 archivos en backend/
□ Copié 14 archivos en frontend/
□ Creé .gitignore en la raíz
□ Abro terminal en fitness-platform/
□ Ejecuté: git init
□ Ejecuté: git add .
□ Ejecuté: git commit -m "Initial commit - FitPro platform"
□ Ejecuté: git remote add origin ...
□ Ejecuté: git branch -M main
□ Ejecuté: git push -u origin main
□ Veo mis archivos en GitHub ✅
```

---

## SIGUIENTE PASO

Cuando hayas completado TODO esto y veas tus archivos en:

```
https://github.com/TU_USUARIO/fitness-platform
```

**Continúa con la Guía de Deploy:**

PASO 3: Configurar MongoDB Atlas
PASO 4: Desplegar en Render (backend)
PASO 5: Desplegar en Vercel (frontend)

---

## 💡 NECESITAS AYUDA?

Cuéntame exactamente:
1. ¿En qué paso te quedaste?
2. ¿Qué error viste (si hay)?
3. ¿Qué comando ejecutaste?

**Responde eso y te ayudo a arreglarlo** 🚀

# 🚀 GUÍA COMPLETA DE DEPLOY - FITPRO

## TABLA DE CONTENIDOS
1. Dónde desplegar
2. Crear cuentas
3. Preparar proyecto
4. Desplegar backend
5. Desplegar frontend
6. Verificar
7. Compartir

---

## 1️⃣ DÓNDE DESPLEGAR (Mi recomendación)

### ✅ SIN COSTO, SIN TARJETA CRÉDITO

```
BACKEND:      Render.com        → GRATIS
FRONTEND:     Vercel.com        → GRATIS  
BASE DE DATOS: MongoDB Atlas    → GRATIS (512MB)

COSTO INICIAL: $0 USD
```

### ¿Por qué?
- ✅ No requieren tarjeta de crédito inicialmente
- ✅ Sin "sleep" (funciona 24/7)
- ✅ Mejor que Heroku (ahora cuesta)
- ✅ Deploys automáticos desde GitHub

---

## 2️⃣ CREAR CUENTAS (15 minutos)

### A. GitHub (si no tienes)
1. Ir a https://github.com/signup
2. Llenar formulario
3. Verificar email
4. ✅ Listo

### B. MongoDB Atlas (Base de datos)
1. Ir a https://www.mongodb.com/cloud/atlas
2. Click "Sign up for free"
3. Email / contraseña
4. Verificar email
5. ✅ Listo

**Importante:** Guarda email y contraseña

### C. Render.com
1. Ir a https://render.com
2. Click "Sign up"
3. Conectar con GitHub
4. Autorizar
5. ✅ Listo

### D. Vercel.com
1. Ir a https://vercel.com/signup
2. Click "Continue with GitHub"
3. Autorizar
4. ✅ Listo

---

## 3️⃣ PREPARAR PROYECTO EN GITHUB

### 3.1 En tu computadora

```bash
# Crear carpeta
mkdir fitness-platform
cd fitness-platform

# Inicializar git
git init

# Crear estructura
mkdir backend frontend
```

### 3.2 Backend - Crear archivos

**backend/package.json:**
```json
{
  "name": "fitness-platform-backend",
  "version": "1.0.0",
  "main": "server.js",
  "engines": {
    "node": "18.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5",
    "express-validator": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

**backend/.env:**
```env
PORT=8080
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/fitness?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_cambiar_esto
NODE_ENV=production
```

**backend/.gitignore:**
```
node_modules/
.env
.DS_Store
*.log
```

**backend/Procfile:**
```
web: node server.js
```

**backend/server.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✓ MongoDB conectado'))
  .catch((err) => console.error('✗ Error MongoDB:', err));

// Rutas básicas
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend en puerto ${PORT}`);
});
```

### 3.3 Frontend - Crear archivos

**frontend/package.json:**
```json
{
  "name": "fitness-platform-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  }
}
```

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:8080/api
```

**frontend/.gitignore:**
```
node_modules/
.env
.env.local
build/
.DS_Store
```

**frontend/public/index.html:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FitPro</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

**frontend/src/index.js:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**frontend/src/App.js:**
```javascript
function App() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>💪 FitPro</h1>
      <p>Plataforma de Entrenamientos Personalizados</p>
      <p style={{ color: 'green' }}>✅ Frontend funcionando</p>
    </div>
  );
}

export default App;
```

### 3.4 .gitignore raíz

**fitness-platform/.gitignore:**
```
node_modules/
.env
.env.local
.DS_Store
build/
dist/
*.log
```

### 3.5 Subir a GitHub

```bash
# En fitness-platform/
git add .
git commit -m "Initial commit - FitPro"
git remote add origin https://github.com/TU_USUARIO/fitness-platform.git
git branch -M main
git push -u origin main
```

✅ **Tu código está en GitHub**

---

## 4️⃣ CONFIGURAR MONGODB ATLAS

### 4.1 Crear Cluster

1. Ir a https://www.mongodb.com/cloud/atlas
2. Login
3. Click "Build a Database"
4. Seleccionar "M0 Sandbox" (GRATIS)
5. Click "Create"
6. Elegir AWS + tu región
7. Click "Create Cluster" (espera 2-3 min)

### 4.2 Crear Usuario

1. Click "Database Access" (izquierda)
2. "Add New Database User"
3. Username: `admin`
4. Password: Generar segura (GUARDAR ESTO)
5. Click "Add User"

### 4.3 Permitir Conexión

1. Click "Network Access" (izquierda)
2. "Add IP Address"
3. Seleccionar "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 4.4 Obtener Connection String

1. Click "Databases" (izquierda)
2. Click "Connect" en tu cluster
3. "Connect your application"
4. Copiar string:

```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/fitness?retryWrites=true&w=majority
```

5. **GUARDAR ESTA URL** - la necesitarás

---

## 5️⃣ DESPLEGAR BACKEND EN RENDER

### 5.1 Crear Web Service

1. Ir a https://render.com
2. Click "New +" → "Web Service"
3. Conectar GitHub
4. Seleccionar repo `fitness-platform`
5. Click "Connect"

### 5.2 Configurar

| Campo | Valor |
|-------|-------|
| Name | `fitness-api` |
| Environment | Node |
| Region | Tu región |
| Branch | main |
| Build Command | `cd backend && npm install` |
| Start Command | `cd backend && node server.js` |

### 5.3 Variables de Entorno

Click "Add Environment Variable":

```
MONGODB_URI = [tu URL de MongoDB que guardaste]
JWT_SECRET = tu_secreto_super_seguro_aqui
NODE_ENV = production
```

### 5.4 Crear

Click "Create Web Service"

⏳ Espera 3-5 minutos

✅ Cuando veas "Your service is live" → Backend listo!

**Guardar tu URL:** `https://fitness-api.onrender.com`

---

## 6️⃣ DESPLEGAR FRONTEND EN VERCEL

### 6.1 Importar Proyecto

1. Ir a https://vercel.com
2. Click "Add New..." → "Project"
3. Importar `fitness-platform`
4. Click "Import"

### 6.2 Configurar

| Campo | Valor |
|-------|-------|
| Framework Preset | React |
| Root Directory | `frontend` |

### 6.3 Variable de Entorno

Click "Environment Variables"

Agregar:
```
REACT_APP_API_URL = https://fitness-api.onrender.com/api
```

(Cambiar por tu URL real de Render)

### 6.4 Desplegar

Click "Deploy"

⏳ Espera 2-3 minutos

✅ Frontend en vivo!

**Tu URL:** `https://fitness-platform.vercel.app`

---

## 7️⃣ VERIFICAR QUE FUNCIONA

### Probar Backend

Abrir en navegador:
```
https://fitness-api.onrender.com/api/health
```

Debería mostrar:
```json
{"status": "Server running", "timestamp": "..."}
```

### Probar Frontend

Abrir:
```
https://fitness-platform.vercel.app
```

Debería ver: "✅ Frontend funcionando"

---

## 🎉 ¡LISTO!

Tu plataforma está en vivo en internet:
```
https://fitness-platform.vercel.app
```

Puedes compartir esta URL con otros 🌐

---

## 📊 Resumen de URLs

```
Frontend:  https://fitness-platform.vercel.app
Backend:   https://fitness-api.onrender.com/api
MongoDB:   atlas.mongodb.com (privado)
Costo:     $0 USD
```

---

## 🔄 Para Hacer Cambios Futuros

```bash
# Editar código
nano backend/server.js

# Subir a GitHub
git add .
git commit -m "Mi cambio"
git push origin main

# Render y Vercel redeploy automáticamente
```

¡Todo listo! 🚀

# FITPRO - CÓDIGO BACKEND COMPLETO

## INSTRUCCIÓN: Copia cada bloque en su archivo correspondiente en backend/

---

## ARCHIVO 1: backend/package.json

```json
{
  "name": "fitness-platform-backend",
  "version": "1.0.0",
  "description": "Backend for FitPro",
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

---

## ARCHIVO 2: backend/.env

```env
PORT=8080
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/fitness-platform?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
NODE_ENV=production
```

---

## ARCHIVO 3: backend/.gitignore

```
node_modules/
.env
.DS_Store
*.log
build/
dist/
```

---

## ARCHIVO 4: backend/Procfile

```
web: node server.js
```

---

## ARCHIVO 5: backend/server.js

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✓ MongoDB conectado'))
  .catch((err) => console.error('✗ Error MongoDB:', err));

// Rutas de Autenticación
app.post('/api/auth/register', async (req, res) => {
  try {
    res.json({ message: 'Registración preparada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    res.json({ message: 'Login preparado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server running', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV 
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
```

---

## ARCHIVO 6: backend/models/User.js

Crear carpeta `backend/models/` y crear archivo User.js

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['trainer', 'client'],
    required: true,
  },
  phone: String,
  specialties: [String],
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientProfile: {
    height: Number,
    weight: Number,
    age: Number,
    goals: [String],
    injuries: [String],
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (passwordToCheck) {
  return await bcrypt.compare(passwordToCheck, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

## ARCHIVO 7: backend/models/Exercise.js

```javascript
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ['fuerza', 'cardio', 'flexibilidad', 'core'],
    required: true,
  },
  muscleGroups: [String],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  equipmentRequired: [String],
  recommendedReps: { min: Number, max: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
```

---

## ARCHIVO 8: backend/models/WorkoutProgram.js

```javascript
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedClients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  daysPerWeek: { type: Number, min: 1, max: 7 },
  duration: Number,
  sessions: [
    {
      dayOfWeek: Number,
      sessionName: String,
      exercises: [
        {
          exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
          sets: Number,
          reps: { min: Number, max: Number },
          weight: String,
          duration: Number,
        }
      ],
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkoutProgram', programSchema);
```

---

## ARCHIVO 9: backend/models/WorkoutLog.js

```javascript
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutProgram' },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      completedSets: Number,
      completedReps: Number,
      actualWeight: String,
      difficulty: String,
    }
  ],
  completed: { type: Boolean, default: false },
  totalDuration: Number,
  energy: Number,
  mood: String,
  notes: String,
});

module.exports = mongoose.model('WorkoutLog', logSchema);
```

---

## ARCHIVO 10: backend/routes/auth.js

Crear carpeta `backend/routes/` y crear archivo auth.js

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const user = new User({ email, password, firstName, lastName, role });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { _id: user._id, email, firstName, lastName, role },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({
      message: 'Login exitoso',
      user: { _id: user._id, email, firstName: user.firstName, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/verify', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ valid: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;
```

---

✅ Backend listo. 10 archivos.

Próximo: Copiar FITPRO_CODIGO_FRONTEND.md para el frontend.

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
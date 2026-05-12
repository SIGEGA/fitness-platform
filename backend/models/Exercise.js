
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
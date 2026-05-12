
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

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
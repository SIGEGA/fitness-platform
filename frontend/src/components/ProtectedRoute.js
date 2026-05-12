
## ARCHIVO 8: frontend/src/components/ProtectedRoute.js

Crear carpeta `frontend/src/components/` primero

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, requiredRole, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
```

---
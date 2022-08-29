import { Routes, Route, useRoutes } from 'react-router-dom';
import { Login } from './views/Login/index';
import { Home } from './views/Home/index';
import { ProtectedRoute } from './components/ProtectedRoute/index';
import './App.css';
import { Register } from './views/Register';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

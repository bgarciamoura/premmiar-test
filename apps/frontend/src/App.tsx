import { Routes, Route, useRoutes } from 'react-router-dom';
import { Login } from './views/Login/index';
import { Register } from './views/Register';
import { Home } from './views/Home/index';
import { CreateCard } from './views/Cards/Create/index';
import { ProtectedRoute } from './components/ProtectedRoute/index';
import './App.css';

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
      <Route
        path="/cards/create"
        element={
          <ProtectedRoute>
            <CreateCard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

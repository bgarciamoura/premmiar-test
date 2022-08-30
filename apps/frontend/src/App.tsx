import { Routes, Route, useRoutes } from 'react-router-dom';
import { Login } from './views/Login/index';
import { Register } from './views/Register';
import { Home } from './views/Home/index';
import { Card } from './views/Cards/index';
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
      <Route path="/cards">
        <Route
          index
          element={
            <ProtectedRoute>
              <Card />
            </ProtectedRoute>
          }
        />
        <Route
          path=":cardId"
          element={
            <ProtectedRoute>
              <Card />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

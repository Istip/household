import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Spin from './components/Spin';
import { useAuth } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate replace to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate replace to="/" />}
          />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

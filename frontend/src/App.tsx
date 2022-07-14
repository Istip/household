import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import { Spinner } from '@chakra-ui/react';

const Home = lazy(() => import('./pages/Home'));

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Suspense
        fallback={
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="gray.500"
            size="xl"
          />
        }
      >
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

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TodoPage from './pages/TodoPage.jsx';
import Login from './pages/LoginPage/Login';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import PrivateRoute from './route/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: '/register', element: <RegisterPage /> },

      {
        path: '/todos',
        element: (
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from '../store/AuthProvider';
import App from '../App';
import Login from '../pages/LoginPage/Login';
import RegisterPage from './../pages/RegisterPage/RegisterPage';
import TodoPage from './../pages/TodoPage';
import DashBoard from '../pages/DashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> }, // 로그인 페이지
      { path: '/register', element: <RegisterPage /> }, // 회원가입 페이지
      {
        path: '/todos',
        element: (
          <AuthProvider>
            <TodoPage />
          </AuthProvider>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AuthProvider>
            <DashBoard />
          </AuthProvider>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

import { Outlet } from 'react-router-dom';
import useUserStore from './store/userStore';
import { useEffect } from 'react';

export default function App() {
  const restoreUser = useUserStore((state) => state.restoreUser);
  const user = useUserStore((state) => state.user);
  console.log('user', user);
  useEffect(() => {
    restoreUser(); // 앱 로드 시 유저 상태 복원
  });

  return <Outlet />;
}

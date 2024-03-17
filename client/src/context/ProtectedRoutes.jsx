import { useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { UserInfoContext } from './UserInfoContext';
import Main from '../pages/main';
import Bot from '../pages/bot';

function ProtectedRoutes() {
  const { user_id } = useContext(UserInfoContext);

  const element = user_id ? undefined : '/login';

  const routes = useRoutes([
    { path: '/bot-chat', element: <Bot /> },
    { path: '/QnA-Input', element: <Main /> },
  ], element);

  return routes;
}

export default ProtectedRoutes;
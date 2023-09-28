import PublicLayout from '@/layouts/PublicLayout';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
// import { isUserLoggedIn } from './utils';
import LoginPage from '@/features/auth/Login';
// import AdminLayout from './layouts/AdminLayout';
import NotFound from '@/features/misc/NotFound';
// import Admin from './features/admin';
// import Shops from './features/shops';
// import Users from './features/users';

function RouterComponent() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: !isUserLoggedIn() ? <Navigate to='/login' /> : <Navigate to='/admin' />,
    // },
    {
      path: "/login",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />
        }
      ]
    },
    // {
    //   path: "/admin",
    //   element: <AdminLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Admin />
    //     },
    //     {
    //       path: "users",
    //       element: <Users />
    //     },
    //     {
    //       path: "shops",
    //       element: <Shops />
    //     },
    //   ]
    // },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default RouterComponent

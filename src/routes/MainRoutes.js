import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const AddProductsDefault = Loadable(lazy(() => import('pages/addProducts')));
const Customers = Loadable(lazy(() => import('pages/customers')));
const AllProducts = Loadable(lazy(() => import('pages/products')));
const Orders = Loadable(lazy(() => import('pages/orders')));
const Payments = Loadable(lazy(() => import('pages/payments')));
const Marketings = Loadable(lazy(() => import('pages/marketings')));
const Analytics = Loadable(lazy(() => import('pages/analytics')));

// render - sample page

// render - utilities

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'addProducts',
      element: <AddProductsDefault />
    },
    {
      path: 'customers',
      element: <Customers />
    },
    {
      path: 'products',
      element: <AllProducts />
    },
    {
      path: 'orders',
      element: <Orders />
    },
    {
      path: 'payments',
      element: <Payments />
    },
    {
      path: 'marketing',
      element: <Marketings />
    },
    {
      path: 'analytics',
      element: <Analytics />
    }
  ]
};

export default MainRoutes;

// assets
import {
  DashboardOutlined,
  HomeOutlined,
  LineChartOutlined,
  CreditCardOutlined,
  SoundOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined,
  TeamOutlined
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  SoundOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },
    {
      id: 'addProducts',
      title: 'Add Products',
      type: 'item',
      url: '/addProducts',
      icon: icons.PlusCircleOutlined,
      breadcrumbs: true
    },
    {
      id: 'products',
      title: 'All Products',
      type: 'item',
      url: '/products',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: true
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    },
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/payments',
      icon: icons.CreditCardOutlined,
      breadcrumbs: true
    },
    {
      id: 'marketings',
      title: 'marketing',
      type: 'item',
      url: '/marketing',
      icon: icons.SoundOutlined,
      breadcrumbs: true
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/analytics',
      icon: icons.LineChartOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;

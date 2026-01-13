import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/product-grid/product-grid').then(m => m.default),
  },
  {
    path: 'product/:productId',
    loadComponent: () => import('./pages/view-product-detail/view-product-detail').then(m => m.default)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist').then(m => m.default),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart').then(m => m.default),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart').then(m => m.default),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.default),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success').then(m => m.default),
  },
];

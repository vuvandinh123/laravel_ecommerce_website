// Site Routers
export const HOME = '/';
export const SEARCH = '/search';
export const PAGE = '/page/:slug';
export const CART = '/cart';
export const BLOG = '/blog';
export const BLOG_DETAIL = '/blog/:slug';
export const PRODUCT_DETAILS = '/products/:slug';
export const CATEGORIES = '/categories';
export const CATEGORIES_DETAILS = '/categories/:slug';
export const LOGIN = '/login';
export const REGISTER = '/singup';
export const CHECKOUT = '/checkout';
// Private router
export const ORDER_DETAILS = '/order-details';
// Admin routes
export const ADMIN_DASHBOARD = '/admin';
export const ADMIN_PRODUCTS = '/admin/products';
export const ADMIN_PRODUCTS_CREATE = '/admin/products/create';
export const ADMIN_PRODUCTS_EDIT = '/admin/products/:slug/edit';
export const ADMIN_PRODUCTS_SHOW = '/admin/products/:slug';
export const ADMIN_IMPORT_PRODUCT = '/admin/import-product';
export const ADMIN_IMPORT_PRODUCT_CREATE = '/admin/import-product/create';
export const ADMIN_CATEGORIES = '/admin/categories';
export const ADMIN_CATEGORIES_CREATE = '/admin/categories/create';
export const ADMIN_CATEGORIES_EDIT = '/admin/categories/:id/edit';
export const ADMIN_CATEGORIES_SHOW = '/admin/categories/:id';
export const ADMIN_BRANDS = '/admin/brands';
export const ADMIN_BRANDS_CREATE = '/admin/brands/create';
export const ADMIN_BRANDS_SHOW = '/admin/brands/:id';
export const ADMIN_BRANDS_EDIT = '/admin/brands/:id/edit';
export const ADMIN_ORDERS = '/admin/orders';
export const ADMIN_PAGES = '/admin/pages';
export const ADMIN_PAGES_CREATE = '/admin/pages/create';
export const ADMIN_MENUS = '/admin/menus';

export const ADMIN_MENUS_CREATE = '/admin/menus/create';
export const ADMIN_MENUS_EDIT = '/admin/menus/:id/edit';
export const ADMIN_MENUS_SHOW = '/admin/menus/:id';
export const ADMIN_USERS = '/admin/users';
export const ADMIN_USERS_CREATE = '/admin/users/create';
export const ADMIN_USERS_EDIT = '/admin/users/:id/edit';
export const ADMIN_USERS_SHOW = '/admin/users/:id';
export const ADMIN_SETTINGS = '/admin/settings';
export const ADMIN_SETTINGS_EDIT = '/admin/settings/:id/edit';
export const ADMIN_SETTINGS_SHOW = '/admin/settings/:id';
export const ADMIN_SETTINGS_CREATE = '/admin/settings/create';
export const ADMIN_SHIPPING = '/admin/shipping';
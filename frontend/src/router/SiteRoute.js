import * as ROUTES from '../constants/routes';
import NoLayout from '../layouts/NoLayout';
import * as PAGE from '../pages'
const publicRoute= [
    {
        path:ROUTES.HOME,
        exact:true,
        component:PAGE.HomePage
    },
    {
        path:ROUTES.CATEGORIES,
        exact:true,
        component:PAGE.CategoryPage
    },
    {
        path:ROUTES.CATEGORIES_DETAILS,
        exact:true,
        component:PAGE.Products
    },
    {
        path:ROUTES.SEARCH,
        exact:true,
        component:PAGE.SearchPage
    },
    {
        path:ROUTES.CART,
        exact:true,
        component:PAGE.CartPage
    },
    {
        path:ROUTES.BLOG,
        exact:true,
        component:PAGE.PostPage
    },
    {
        path:ROUTES.BLOG_DETAIL,
        exact:true,
        component:PAGE.PostDetailPage
    },
    {
        path:ROUTES.PRODUCT_DETAILS,
        exact:true,
        component:PAGE.ProductDetail
    },
    {
        path:ROUTES.LOGIN,
        layout:NoLayout,
        exact:true,
        component:PAGE.LoginPage
    },
    {
        path:ROUTES.REGISTER,
        exact:true,
        layout:NoLayout,
        component:PAGE.SingupPage
    },
    {
        path:ROUTES.CHECKOUT,
        exact:true,
        layout:NoLayout,
        component:PAGE.CheckoutPage
    },
    {
        path:ROUTES.ORDER_DETAILS,
        exact:true,
        component:PAGE.OrderDetailPage
    },
    

]

export {publicRoute}
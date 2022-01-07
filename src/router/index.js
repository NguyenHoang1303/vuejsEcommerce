import Vue from 'vue'
import VueRouter from 'vue-router'
import {orderRoutes} from "../pages/order";
import {productRoutes} from "../pages/product";
import {accountRoute} from "../pages/account";
import {loginRoute} from "../pages/login";

Vue.use(VueRouter)

const routes = [
    ...orderRoutes,
    ...productRoutes,
    ...accountRoute,
    ...loginRoute
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let token = localStorage.getItem('access_token');
    if (to.name !== 'Login' && !token) {
        next({ name: 'Login' });
    }
    else {
        next();
    }
})

export default router;
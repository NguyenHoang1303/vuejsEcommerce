import AppLayout from '../../layouts/AppLayout'

const routes = [
    {
        path: '/demo/products',
        component: AppLayout,
        name: 'product',
        meta: {
            title: 'Product',
            icon: 'appstore'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'productList',
                meta: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'productCreate',
                meta: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Form'),
                name: 'productEdit',
                meta: {
                    title: 'Edit',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;
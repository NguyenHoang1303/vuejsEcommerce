
import AppLayout from '../../layouts/AppLayout'

const routes = [
    {
        path: '/demo/orders',
        component: AppLayout,
        name: 'order',
        meta: {
            title: 'Order',
            icon: 'ordered-list'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'orderList',
                meta: {
                    title: 'List',
                }
            },
            {
                path: 'detail/:id',
                component: () => import('./Detail'),
                name: 'orderDetail',
                meta: {
                    title: 'Detail',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;
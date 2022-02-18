
import AppLayout from '../../layouts/AppLayout'

const routes = [
    {
        path: '/demo/accounts',
        component: AppLayout,
        name: 'account',
        meta: {
            title: 'Account',
            icon: 'team'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'accountList',
                meta: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'accountForm',
                meta: {
                    title: 'Form',
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Detail'),
                name: 'accountEdit',
                meta: {
                    title: 'Detail',
                    hidden: true
                }
            },

        ]
    }
]

export default routes;
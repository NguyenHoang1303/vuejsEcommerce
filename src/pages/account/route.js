
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
                component: () => import('./Form'),
                name: 'accountEdit',
                meta: {
                    title: 'Form',
                    hidden: true
                }
            },

        ]
    }
]

export default routes;
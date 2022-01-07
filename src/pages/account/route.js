
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

        ]
    }
]

export default routes;
import AppLayout from '../../layouts/AppLayout'

const routes = [
    {
        path: '/demo/roles',
        component: AppLayout,
        name: 'role',
        meta: {
            title: 'Role',
            icon: 'team'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'roleList',
                meta: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: () => import('./Create'),
                name: 'roleCreate',
                meta: {
                    title: 'Create',
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Create'),
                name: 'roleEdit',
                meta: {
                    title: 'Edit',
                    hidden: true
                }
            },
            {
                path: 'test',
                component: () => import('./Test'),
                name: 'testRole',
                meta: {
                    title: 'Test',
                }
            },

        ]
    }
]

export default routes;
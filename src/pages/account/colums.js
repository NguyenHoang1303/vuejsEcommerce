export const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'id'},
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        scopedSlots: {customRender: 'username'},
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        scopedSlots: {customRender: 'role'},
    },
    {
        title: 'Permission',
        dataIndex: 'privileges',
        key: 'privileges',
        scopedSlots: {customRender: 'privileges'},
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: {customRender: 'action'},
        width:'10%'
    },
]
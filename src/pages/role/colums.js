export const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'id'},
    },
    {
        title: 'Role',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {customRender: 'name'},
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
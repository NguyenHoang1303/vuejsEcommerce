
const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'name'},
    },
    {
        title: 'Image',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        scopedSlots: {customRender: 'thumbnail'},
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        scopedSlots: {customRender: 'price'},
    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',

    },
    {
        title: 'Created at',
        key: 'createdAt',
        dataIndex: 'createdAt',
        scopedSlots: {customRender: 'createdAt'},

    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: {customRender: 'action'},
        width: 110,
    },
];

const params = {
    name: "",
    id: "",
    page: 1,
    minPrice: undefined,
    maxPrice: undefined,
    categoryId: undefined,
}


export  {
    params,
    columns
}
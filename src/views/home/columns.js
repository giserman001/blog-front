export default dayjs => {
  return [
    {
      dataIndex: 'title',
      key: 'title',
      title: '标题',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: '分类',
      dataIndex: 'categories',
      slots: { customRender: 'categories' },
    },
    {
      title: '浏览次数',
      dataIndex: 'viewCount',
      sorter: (a, b) => a.viewCount - b.viewCount,
    },
    {
      title: '发布时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: '修改时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: (a, b) => dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
    },
    {
      title: '操作',
      key: 'action',
      width: 350,
      slots: { customRender: 'action' },
    },
  ];
};

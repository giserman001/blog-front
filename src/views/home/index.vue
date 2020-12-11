<template>
  <div>
    <a-form layout="inline" :model="formInline" @submit="handleSubmit" @submit.prevent colon>
      <a-form-item label="关键字">
        <a-input v-model:value="formInline.keyword" placeholder="请输入关键字">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item label="标签">
        <a-select v-model:value="formInline.tag" placeholder="请选择标签" class="selectWidth">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model:value="formInline.classify" placeholder="请选择分类" class="selectWidth">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 查询 </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      class="mt10"
      rowKey="id"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ y: 500 }"
      @change="handleTableChange"
    >
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #tags="{ text: tags }">
        <span>
          <a-tag
            v-for="tag in tags"
            :key="tag.name"
            :color="tag.name === 'loser' ? 'volcano' : tag.name.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.name.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template #categories="{ text: categories }">
        <span>
          <a-tag
            v-for="item in categories"
            :key="item.name"
            :color="item.name === 'loser' ? 'volcano' : item.name.length > 5 ? 'geekblue' : 'green'"
          >
            {{ item.name.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link">查看{{ record.name }}</a-button>
        <a-divider type="vertical" />
        <a-button type="link">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link">导出</a-button>
        <a-divider type="vertical" />
        <a-button type="link">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { articleList } from '@/service/index';
import dayjs from 'dayjs';
export default {
  setup() {
    // 查询
    const data = reactive({
      formInline: {
        keyword: '',
        tag: '',
        classify: '',
      },
    });
    function handleSubmit() {
      console.log('提交');
    }
    // 表格交互
    const table = reactive({
      columns: [
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
          defaultSortOrder: 'descend',
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
          defaultSortOrder: 'descend',
          sorter: (a, b) => dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
        },
        {
          title: '操作',
          key: 'action',
          width: 350,
          slots: { customRender: 'action' },
        },
      ],
      data: [],
      pagination: {},
      loading: false,
    });
    onMounted(async () => {
      table.loading = true;
      const {
        code,
        data: { list, page },
      } = await articleList();
      table.loading = false;
      if (code !== 200) return;
      const pagination = { ...table.pagination };
      pagination.total = page.total;
      pagination.current = page.currentPage;
      pagination.pageSize = page.pageSize;
      table.pagination = pagination;
      table.data = list;
    });

    function handleTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter);
      // const pager = { ...this.pagination };
      // pager.current = pagination.current;
      // this.pagination = pager;
      // this.fetch({
      //   results: pagination.pageSize,
      //   page: pagination.current,
      //   sortField: sorter.field,
      //   sortOrder: sorter.order,
      //   ...filters,
      // });
    }
    return {
      ...toRefs(data),
      ...toRefs(table),
      handleTableChange,
      handleSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.selectWidth {
  width: 200px;
}
</style>

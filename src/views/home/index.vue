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
          <a-select-option v-for="item in tagArr" :value="item.name" :key="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model:value="formInline.category" placeholder="请选择分类" class="selectWidth">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="item in CategoriesArr" :value="item.name" :key="item.id">{{
            item.name
          }}</a-select-option>
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
import { articleList, getTags, getCategories } from '@/service/index';
import dayjs from 'dayjs';
import columns from './columns';
export default {
  setup() {
    // 查询下拉框业务逻辑
    const select = reactive({
      tagArr: [],
      CategoriesArr: [],
    });
    onMounted(() => {
      getTags().then(res => {
        select.tagArr = res.data;
      });
      getCategories().then(res => {
        select.CategoriesArr = res.data;
      });
    });
    // 查询逻辑
    const data = reactive({
      formInline: {
        keyword: '',
        tag: '',
        category: '',
        preview: 0,
      },
    });
    function handleSubmit() {
      const { current, pageSize, order } = table.pagination;
      let params = { page: current, pageSize, order, ...data.formInline };
      getList(params);
    }
    // 表格业务逻辑
    const table = reactive({
      columns: columns(dayjs),
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        order: 'createdAt DESC',
      },
      loading: false,
    });
    onMounted(async () => {
      const { current, pageSize, order } = table.pagination;
      let params = { page: current, pageSize, order, ...data.formInline };
      getList(params);
    });
    async function getList(query) {
      table.loading = true;
      const {
        code,
        data: { list, page },
      } = await articleList(query);
      table.loading = false;
      if (code !== 200) return;
      const pagination = { ...table.pagination };
      pagination.total = +page.total;
      pagination.current = +page.currentPage;
      pagination.pageSize = +page.pageSize;
      table.pagination = pagination;
      table.data = list;
    }
    function handleTableChange(pagination, filters, sorter) {
      table.pagination.current = pagination.current;
      const { current, pageSize } = table.pagination;
      const order = `${sorter.field} ${sorter.order === 'descend' ? 'DESC' : 'ASC'}`;
      const query = { page: current, pageSize, order, ...data.formInline };
      getList(query);
    }
    return {
      ...toRefs(data),
      ...toRefs(table),
      ...toRefs(select),
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

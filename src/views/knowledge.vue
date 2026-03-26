<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button @click="dialogVisible = true" type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%;margin-top: 25px;">
      <el-table-column label="文章标题" width="450" fixed="left">
        <template #default="scope">
          <div style="display: flex;align-items: center;">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex;align-items: center;">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" />
      <el-table-column prop="favoriteCount" label="阅读量" width="150" />
      <el-table-column prop="publishedAt" label="发布时间" width="150" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">编辑</el-button>
          <el-button text v-if="scope.row.status === 0 || scope.row.status === 2" type="success">发布</el-button>
          <el-button text v-if="scope.row.status === 1" type="warning">下线</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    style="margin-top: 25px;"
    :page-size="pagination.size"
    layout="prev, pager, next" 
    :total="pagination.total" 
    @change="handleChange" />
  </div>
  <ArticleDialog v-model:modelValue="dialogVisible" :categoryList="categoryList"/>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue';
import { categoryTree, articlePage } from '@/api/admin.js'
import ArticleDialog from '@/components/ArticleDialog.vue'


const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
  {
    comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类'
  },
  {
    comp: 'select', prop: 'status', label: '状态', placeholder: '请输入文章内容', options: [
      {
        label: '草稿',
        value: '0'
      }, {
        label: '已发布',
        value: '1'
      }, {
        label: '已下线',
        value: '2'
      }
    ]
  }
]

//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

const handleSearch = async (formData) => {
  console.log(formData, '查询参数')

  const params = {
    ...pagination,
    ...formData
  }

  const { records, total } = await articlePage(params)
  tableData.value = records
  pagination.total = total
}

const handleChange = (page)=>{
  pagination.currentPage = page
  handleSearch()
}

//分类映射
const categoryMap = reactive({})
//分类列表
const categoryList = reactive([])

//列表数据
const tableData = ref([])

//新增和编辑
const dialogVisible = ref(false)

onMounted(async () => {
  const data = await categoryTree()
  categoryList.value = data.map(item => {
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categoryList.value

  //获取列表
  handleSearch()
})
</script>
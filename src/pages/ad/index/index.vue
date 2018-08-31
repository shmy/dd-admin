<template>
  <d2-container>
    <create @submit="handleSubmit($event)"
            ref="createDialog" />
    <div class="fliterbar">
      <el-button size="small"
                 @click="$refs.createDialog.open()"
                 type="primary">+ 新增广告</el-button>

    </div>
    <el-table :data="items"
              border
              size="small"
              style="width: 100%">
      <el-table-column prop="name"
                       label="名称"
                       width="200">
      </el-table-column>
      <el-table-column prop="type"
                       label="类型"
                       width="200">
      </el-table-column>
      <el-table-column prop="data"
                       label="参数"
                       width="200">
      </el-table-column>
      <el-table-column prop="created_at"
                       label="创建时间"
                       width="200">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="90">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row._id, scope.$index)"
                     type="text"
                     disabled=""
                     size="small">编辑</el-button>
          <el-button type="text"
                     @click="handleDel(scope.row._id, scope.$index)"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange($event)"
                     @current-change="handleCurrentChange($event)"
                     :current-page="params.page"
                     :page-sizes="[15, 30, 50, 80, 120, 150, 200]"
                     :page-size="params.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     :disabled="loading">
      </el-pagination>
    </div>
  </d2-container>
</template>
<script>
import Create from '@/components/ad/create'
export default {
  data: () => ({
    total: 1,
    params: {
      page: 1,
      per_page: 15
    },
    loading: false,
    items: []
  }),
  components: {
    create: Create
  },
  async created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      const [data, err] = await this.$sve.ad.list({
        params: this.params
      })
      this.loading = false
      if (err) return
      this.items = data.result
      this.total = data.total
      this.$nextTick(() => this.backTop())
    },
    async handleSubmit ({ data, cancel, close }) {
      const [, err] = await this.$sve.ad.create(data)
      if (err) {
        cancel()
        return
      }
      close()
      this.$message.success('新增成功')
      this.fetch()
    },
    handleDel (id, index) {
      this.$confirm('此操作不可逆，确实要删除吗？', '警告', {
        type: 'warning'
      })
        .then(async () => {
          const [, err] = await this.$sve.ad.del(id)
          if (err) {
            return
          }
          this.$message.success('删除成功')
          this.fetch()
        })
        .catch(() => {})
    },
    handleSizeChange (v) {
      this.params.per_page = v
      this.fetch()
    },
    handleCurrentChange (v) {
      this.params.page = v
      this.fetch()
    }
  }
}
</script>

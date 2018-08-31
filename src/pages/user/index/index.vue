<template>
  <d2-container>
    <el-table :data="items"
              border
              size="small"
              style="width: 100%">
      <el-table-column prop="username"
                       label="用户名"
                       width="200">
      </el-table-column>
      <el-table-column prop="created_at"
                       label="注册时间"
                       width="200">
      </el-table-column>
      <el-table-column prop="nickname"
                       label="昵称"
                       width="200">
      </el-table-column>
      <el-table-column prop="email"
                       label="电子邮箱"
                       width="200">
      </el-table-column>
      <el-table-column prop="integral"
                       label="积分"
                       width="60">
      </el-table-column>
      <el-table-column prop="level"
                       label="等级"
                       width="60">
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
  async created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      const [data, err] = await this.$sve.user.list({
        params: this.params
      })
      this.loading = false
      if (err) return
      this.items = data.result
      this.total = data.total
      this.$nextTick(() => this.backTop())
    },
    // doSearch () {
    //   if (!this.params.keyword) return
    //   this.params.page = 1
    //   this.fetch()
    // },
    handleSizeChange (v) {
      this.params.per_page = v
      this.fetch()
    },
    handleCurrentChange (v) {
      this.params.page = v
      this.fetch()
    }
    // async handleEdit (id, index) {
    //   const [data, err] = await this.$sve.resource.detail(id)
    //   if (err) return
    //   this.$refs.edit.open(data, index)
    // },
    // async handleSubmit ({ id, data, index, cancel, close }) {
    //   const [, err] = await this.$sve.resource.update(id, data)
    //   if (err) {
    //     cancel()
    //     return
    //   }
    //   close()
    //   this.$message.success('编辑成功')
    //   this.fetch()
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>

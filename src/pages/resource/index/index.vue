<template>
  <d2-container>
    <div class="fliterbar">
      <div class="auto">
        <el-cascader :options="classifyOptions"
                    expand-trigger="click"
                    change-on-select
                    size="small"
                    @change="fetch()"
                    filterable
                    :show-all-levels="false"
                    v-model="filterbar.classidyId">
        </el-cascader>
        <el-select v-model="params.source"
                  size="small"
                  @change="fetch()"
                  placeholder="请选择来源">
          <el-option v-for="item of sourceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="params.sort"
                  size="small"
                  @change="fetch()"
                  placeholder="请选择排序">
          <el-option v-for="item of orderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="params.year"
                  size="small"
                  @change="fetch()"
                  placeholder="请选择年代">
          <el-option v-for="item of yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="params.area"
                  size="small"
                  @change="fetch()"
                  placeholder="请选择地区">
          <el-option v-for="item of areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-select v-model="params.query"
                  slot="prepend"
                  size="small"
                  @change="fetch()"
                  placeholder="请选择搜索方式">
          <el-option label="精确匹配"
                     value="1">
          </el-option>
          <el-option label="模糊匹配"
                     value="2">
          </el-option>
        </el-select>
      <el-input placeholder="请输入关键字，回车以搜索"
                v-model="params.keyword"
                size="small"
                @keydown.native.enter="doSearch()"
                class="input-with-select">

        <el-button slot="append"
                  icon="el-icon-search"
                  size="small"
                  @click="doSearch()">
        </el-button>
      </el-input>
    </div>
    <el-table :data="items"
              border
              size="small"
              style="width: 100%">
      <el-table-column prop="name"
                       label="视频名称"
                       width="200">
        <template slot-scope="scope">

          <el-popover placement="bottom-start"
                      trigger="hover">
            <img :src="scope.row.thumbnail"
                 alt="">
            <span slot="reference">
              <span>{{scope.row.name}}</span>
              <i class="thumbnail el-icon-picture"></i>
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="latest"
                       label="进度"
                       width="200">
      </el-table-column>
      <el-table-column prop="source"
                       label="来源"
                       width="70">
      </el-table-column>
      <el-table-column prop="released_at"
                       label="上映时间"
                       width="80">
      </el-table-column>
      <el-table-column prop="language"
                       label="语言"
                       width="80">
      </el-table-column>
      <el-table-column prop="region"
                       label="地区"
                       width="80">
      </el-table-column>
      <el-table-column prop="number"
                       label="浏览次数"
                       width="80">
      </el-table-column>
      <el-table-column prop="generated_at"
                       label="最后抓取时间"
                       width="300">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="55">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row._id, scope.$index)"
                     type="text"
                     size="small">编辑</el-button>
          <!-- <el-button type="text"
                     size="small">编辑</el-button> -->
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
    <edit ref="edit" @submit="handleSubmit($event)" />
  </d2-container>
</template>
<script>
export default {
  data: () => ({
    classifyOptions: [
      {
        value: '5b1362ab30763a214430d036',
        label: '电影',
        children: [
          {'label': '动作片', 'value': '5b0fd14e7cad175a34a2ea8a'},
          {'label': '爱情片', 'value': '5b0fd14e7cad175a34a2ea8c'},
          {'label': '科幻片', 'value': '5b0fd14e7cad175a34a2ea8d'},
          {'label': '喜剧片', 'value': '5b0fd14e7cad175a34a2ea8b'},
          {'label': '战争片', 'value': '5b0fd14e7cad175a34a2ea90'},
          {'label': '恐怖片', 'value': '5b0fd14e7cad175a34a2ea8e'},
          {'label': '剧情片', 'value': '5b0fd14e7cad175a34a2ea8f'},
          {'label': '记录片', 'value': '5b6bd4eb50456c5fb99610f4'}
        ]
      },
      {
        value: '5b1fce6330025ae5371a6a8a',
        label: '连续剧',
        children: [
          {'label': '国产剧', 'value': '5b1fcf0b30025ae5371a6ad8'},
          {'label': '港台剧', 'value': '5b1fcf6330025ae5371a6b00'},
          {'label': '日韩剧', 'value': '5b1fcfb230025ae5371a6b22'},
          {'label': '欧美剧', 'value': '5b1fcffb30025ae5371a6b41'}
        ]
      },
      {
        value: '5b1fd85730025ae5371abaed',
        label: '综艺'
      },
      {
        value: '5b1fdbee30025ae5371ac363',
        label: '动漫'
      }
    ],
    sourceOptions: [
      {'label': '不限来源', 'value': ''},
      {'label': '最大资源网', 'value': 'zuidazy'},
      {'label': '酷云资源网', 'value': 'kuyunzy'}
    ],
    orderOptions: [
      {'label': '最新收录', 'value': '1'},
      {'label': '最新上映', 'value': '2'},
      {'label': '最多播放', 'value': '3'}
    ],
    yearOptions: [
      {'label': '不限年代', 'value': ''},
      {'label': '2018', 'value': '2018'},
      {'label': '2017', 'value': '2017'},
      {'label': '2016', 'value': '2016'},
      {'label': '2015', 'value': '2015'},
      {'label': '2014', 'value': '2014'},
      {'label': '2013', 'value': '2013'},
      {'label': '2012', 'value': '2012'},
      {'label': '2011', 'value': '2011'},
      {'label': '2010', 'value': '2010'},
      {'label': '00年代', 'value': '00'},
      {'label': '90年代', 'value': '90'},
      {'label': '80年代', 'value': '80'},
      {'label': '70年代', 'value': '70'},
      {'label': '更早', 'value': '更早'}
    ],
    areaOptions: [
      {'label': '不限地区', 'value': ''},
      {'label': '大陆', 'value': '大陆'},
      {'label': '香港', 'value': '香港'},
      {'label': '台湾', 'value': '台湾'},
      {'label': '日本', 'value': '日本'},
      {'label': '韩国', 'value': '韩国'},
      {'label': '美国', 'value': '美国'},
      {'label': '法国', 'value': '法国'},
      {'label': '德国', 'value': '德国'},
      {'label': '英国', 'value': '英国'},
      {'label': '其他', 'value': '其他'}
    ],
    filterbar: {
      classidyId: ['5b1362ab30763a214430d036']
    },
    total: 1,
    params: {
      page: 1,
      per_page: 15,
      source: '',
      sort: '1',
      year: '',
      area: '',
      keyword: '',
      query: '1'
    },
    loading: false,
    items: []
  }),
  components: {
    'edit': () => import('@/components/resource/edit')
  },
  async created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      const id = this.filterbar.classidyId[this.filterbar.classidyId.length - 1]
      const [data, err] = await this.$sve.resource.list(id, {
        params: this.params
      })
      this.loading = false
      if (err) return
      this.items = data.result
      this.total = data.total
      this.$nextTick(() => this.backTop())
    },
    doSearch () {
      if (!this.params.keyword) return
      this.params.page = 1
      this.fetch()
    },
    handleSizeChange (v) {
      this.params.per_page = v
      this.fetch()
    },
    handleCurrentChange (v) {
      this.params.page = v
      this.fetch()
    },
    async handleEdit (id, index) {
      const [data, err] = await this.$sve.resource.detail(id)
      if (err) return
      this.$refs.edit.open(data, index)
    },
    async handleSubmit ({ id, data, index, cancel, close }) {
      const [, err] = await this.$sve.resource.update(id, data)
      if (err) {
        cancel()
        return
      }
      close()
      this.$message.success('编辑成功')
      this.fetch()
    }
  }
}
</script>
<style lang="scss" scoped>
.thumbnail {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: blue;
  cursor: pointer;
}
.fliterbar,
.pagination {
  text-align: right;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
}
.fliterbar {
  text-align: left;
  margin-top: 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  .auto {
    flex: 1;
    width: 0;
  }
  .el-cascader--small, .el-select--small {
    width: 110px;
    margin-left: 10px;
  }
  .el-cascader--small {
    &:nth-of-type(1) {
    margin-left: 0;

    }
  }
  .el-input--small {
    width: 300px;
    margin-left: 10px;
  }
}
</style>

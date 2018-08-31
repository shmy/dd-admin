<template>
  <el-dialog title="编辑视频"
             class="fullscreen"
             :visible.sync="dialogVisible"
             width="700px"
             center
             @closed="handleClose()"
             :append-to-body="true">
    <div>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item label="视频名称">
              <el-input size="small"
                        v-model="form.name">

                <el-button slot="append"
                           @click="doBaiduSearch(form.name)"
                           icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="语言">
                  <el-input size="small"
                            v-model="form.language"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地区">
                  <el-input size="small"
                            v-model="form.region"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上映年份">
                  <el-date-picker style="width: 140px"
                                  v-model="form.released_at"
                                  type="year"
                                  size="small"
                                  placeholder="选择上映年份">
                  </el-date-picker>

                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最后收录">
                  <el-date-picker style="width: 140px"
                                  v-model="form.generated_at"
                                  type="datetime"
                                  size="small"
                                  placeholder="选择最后收录">
                  </el-date-picker>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="时长(分)">
                  <el-input-number size="small"
                                   :min="0"
                                   :precision="0"
                                   v-model="form.running_time"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="浏览次数">
                  <el-input-number size="small"
                                   :min="0"
                                   :precision="0"
                                   v-model="form.number"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

          </el-col>
          <el-col :span="7">
            <img :src="form.thumbnail"
                 style="width: 100%; height: 230px"
                 alt="">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="视频分类">
              <el-select v-model="form.pid"
                         placeholder="请选择视频分类">
                <el-option-group v-for="group in classifyOptions"
                                 :key="group.label"
                                 :label="group.label">
                  <el-option v-for="item in group.options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频来源">
              <el-input size="small"
                        disabled
                        v-model="form.source"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="视频别名">
          <shmy-tag v-model="form.alias" />
        </el-form-item>
        <el-form-item label="导演">
          <shmy-tag v-model="form.director" />
        </el-form-item>
        <el-form-item label="演员">
          <shmy-tag v-model="form.starring" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input size="small"
                    v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item label="进度">
          <el-input size="small"
                    v-model="form.latest"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="form.introduce">
          </el-input>
        </el-form-item>

      </el-form>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button :disabled="loading"
                 @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 :loading="loading"
                 @click="handleSubmit()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
function getDefaultForm () {
  return {
    name: '',
    alias: [],
    director: [],
    starring: [],
    keyword: '',
    thumbnail: '',
    introduce: '',
    language: '',
    region: '',
    released_at: '',
    generated_at: '',
    latest: '',
    source: '',
    pid: '',
    running_time: 0,
    number: 0
  }
}
export default {
  name: 'edit',
  data: () => ({
    dialogVisible: false,
    form: getDefaultForm(),
    id: '',
    index: 0,
    loading: false,
    classifyOptions: [
      {
        label: '电影',
        options: [
          { label: '动作片', value: '5b0fd14e7cad175a34a2ea8a' },
          { label: '爱情片', value: '5b0fd14e7cad175a34a2ea8c' },
          { label: '科幻片', value: '5b0fd14e7cad175a34a2ea8d' },
          { label: '喜剧片', value: '5b0fd14e7cad175a34a2ea8b' },
          { label: '战争片', value: '5b0fd14e7cad175a34a2ea90' },
          { label: '恐怖片', value: '5b0fd14e7cad175a34a2ea8e' },
          { label: '剧情片', value: '5b0fd14e7cad175a34a2ea8f' },
          { label: '记录片', value: '5b6bd4eb50456c5fb99610f4' }
        ]
      },
      {
        label: '连续剧',
        options: [
          { label: '国产剧', value: '5b1fcf0b30025ae5371a6ad8' },
          { label: '港台剧', value: '5b1fcf6330025ae5371a6b00' },
          { label: '日韩剧', value: '5b1fcfb230025ae5371a6b22' },
          { label: '欧美剧', value: '5b1fcffb30025ae5371a6b41' }
        ]
      },
      {
        label: '其他',
        options: [
          { label: '综艺', value: '5b1fd85730025ae5371abaed' },
          { label: '动漫', value: '5b1fdbee30025ae5371ac363' }
        ]
      }
    ]
  }),
  components: {
    'shmy-tag': () => import('@/components/common/shmy-tag')
  },
  methods: {
    open (form, index) {
      form = JSON.parse(JSON.stringify(form))
      Object.keys(getDefaultForm()).forEach(key => {
        this.form[key] = form[key]
      })
      this.id = form._id
      this.index = index
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    cancel () {
      this.loading = false
    },
    handleClose () {
      this.id = ''
      this.index = 0
      this.loading = false
      this.form = getDefaultForm()
    },
    handleDeleteTag (key, index) {
      this.form[key].splice(index, 1)
    },
    handleSubmit () {
      this.loading = true
      this.$emit('submit', {
        id: this.id,
        index: this.index,
        data: this.form,
        cancel: this.cancel,
        close: this.close
      })
    },
    doBaiduSearch (name) {
      window.open(`https://www.baidu.com/s?wd=${name}`)
    }
  }
}
</script>
<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-dialog__wrapper {
  overflow: hidden;
}
.fullscreen .el-dialog {
  display: flex;
  flex-direction: column;
  margin-top: 0 !important;
  height: 100%;
}
.fullscreen .el-dialog__body {
  height: 0;
  flex: 1;
  overflow: auto;
}
</style>

<template>
  <div>
    <el-tag v-for="(item, index) of tags"
            :key="index"
            size="medium"
            closable
            @close="handleDeleteTag(index)">
      {{item}}
    </el-tag>
    <el-input class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm()"
              @blur="handleInputConfirm()">
    </el-input>
    <el-button v-else
               class="button-new-tag"
               size="mini"
               @click="showInput()">
      <i class="el-icon-plus"></i> 添加一项</el-button>

  </div>
</template>
<script>
export default {
  name: 'shmy-tag',
  data: () => ({
    inputVisible: false,
    inputValue: ''
  }),
  model: {
    prop: 'tags',
    event: 'change'
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleDeleteTag (index) {
      this.tags.splice(index, 1)
      this.$emit('change', this.tags)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tags.push(inputValue)
        this.$emit('change', this.tags)
      }
      this.inputVisible = false
      this.inputValue = '';
    }
  }
}
</script>
<style lang="scss" scoped>
.input-new-tag {
  width: 100px;
}
.input-new-tag,
.button-new-tag {
  margin-left: 10px;
}
</style>

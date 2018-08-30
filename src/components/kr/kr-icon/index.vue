<template>
  <i class="iconfont" :class="`icon-${name}`" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'kr-icon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

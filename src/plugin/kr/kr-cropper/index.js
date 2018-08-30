import krCropperDialog from '@/components/kr/kr-cropper-dialog'

export default {
  install (Vue) {
    const KrCropperDialog = Vue.extend(krCropperDialog)
    const component = new KrCropperDialog()
    document.body.appendChild(component.$mount().$el)
    Vue.prototype.$krCropper = component
  }
}

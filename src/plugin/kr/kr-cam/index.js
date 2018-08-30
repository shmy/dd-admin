import krCamDialog from '@/components/kr/kr-cam-dialog'

export default {
  install (Vue) {
    const KrCamDialog = Vue.extend(krCamDialog)
    const component = new KrCamDialog()
    document.body.appendChild(component.$mount().$el)
    Vue.prototype.$krCam = component
  }
}

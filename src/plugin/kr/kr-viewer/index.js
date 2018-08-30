import krViewer from '@/components/kr/kr-viewer'

export default {
  install (Vue) {
    const KrViewer = Vue.extend(krViewer)
    const component = new KrViewer()
    document.body.appendChild(component.$mount().$el)
    Vue.prototype.$krViewer = component
  }
}

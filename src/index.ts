import { VueConstructor } from 'vue'
import SplitterPane from './SplitterPane.vue'

export default SplitterPane

declare global {
    interface Window {
        Vue: VueConstructor
    }
}

if (window &&  window.Vue) {
    window.Vue.component('splitter-pane', SplitterPane)
}

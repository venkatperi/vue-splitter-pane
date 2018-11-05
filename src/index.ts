import { PluginObject, VueConstructor } from 'vue'
import VueSplitter from './VueSplitter/Container.vue'
import VueSplitterH from "./VueSplitter/ContainerH"
import VueSplitterV from "./VueSplitter/ContainerV"

const plugin: PluginObject<any> = {
    install(Vue: VueConstructor) {
        Vue.component('vue-splitter', VueSplitter)
        Vue.component('vue-splitter-v', VueSplitterV)
        Vue.component('vue-splitter-h', VueSplitterH)
    }
}

// @ts-ignore
VueSplitter.install = plugin.install

declare global {
    interface Window {
        Vue: VueConstructor
    }
}

if (window && window.Vue) {
    // @ts-ignore
    window.Vue.use(VueSplitter)
}

export default VueSplitter

export
{
    VueSplitterH,
    VueSplitterV,
    plugin
}

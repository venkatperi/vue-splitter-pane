import { PluginObject, VueConstructor } from 'vue'
import SplitterPane from './SplitterPane.vue'
import SplitterPaneH from "./SplitterPaneH"
import SplitterPaneV from "./SplitterPaneV"

export default SplitterPane

const plugin: PluginObject<any> = {
    install(Vue: VueConstructor) {
        Vue.component('splitter-pane', SplitterPane)
        Vue.component('splitter-pane-v', SplitterPaneV)
        Vue.component('splitter-pane-h', SplitterPaneH)
    }
}

// @ts-ignore
SplitterPane.install = plugin.install

declare global {
    interface Window {
        Vue: VueConstructor
    }
}

if (window && window.Vue) {
    // @ts-ignore
    window.Vue.use(SplitterPane)
}

export
{
    SplitterPaneV,
    SplitterPaneH,
    plugin
}

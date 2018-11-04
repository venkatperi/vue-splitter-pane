import SplitterPane from './SplitterPane.vue';
import SplitterPaneH from "./SplitterPaneH";
import SplitterPaneV from "./SplitterPaneV";
export default SplitterPane;
var plugin = {
    install: function (Vue) {
        Vue.component('splitter-pane', SplitterPane);
        Vue.component('splitter-pane-v', SplitterPaneV);
        Vue.component('splitter-pane-h', SplitterPaneH);
    }
};
// @ts-ignore
SplitterPane.install = plugin.install;
if (window && window.Vue) {
    // @ts-ignore
    window.Vue.use(SplitterPane);
}
export { SplitterPaneV, SplitterPaneH, plugin };
//# sourceMappingURL=index.js.map
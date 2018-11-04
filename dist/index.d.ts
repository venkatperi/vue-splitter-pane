import { PluginObject, VueConstructor } from 'vue';
import SplitterPane from './SplitterPane.vue';
import SplitterPaneH from "./SplitterPaneH";
import SplitterPaneV from "./SplitterPaneV";
export default SplitterPane;
declare const plugin: PluginObject<any>;
declare global {
    interface Window {
        Vue: VueConstructor;
    }
}
export { SplitterPaneV, SplitterPaneH, plugin };

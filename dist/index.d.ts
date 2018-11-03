import { VueConstructor } from 'vue';
import SplitterPane from './SplitterPane.vue';
export default SplitterPane;
declare global {
    interface Window {
        Vue: VueConstructor;
    }
}

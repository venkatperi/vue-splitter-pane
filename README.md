# Vue Splitter Pane

`vue-vue-splitter` is a Vuejs component which renders two slots in a adjustable split arrangement (vetical or horizontal).

Uses `flex-box` for sizing.

### Installation & Usage
```bash
$ npm install vue-vue-splitter
```

#### Vue Global Usage
```javascript
import VueSplitter from 'vue-vue-splitter'
Vue.use(VueSplitter); # registers vue-splitter, vue-splitter-v and vue-splitter-h

```

#### Vue Local Usage
```javascript
import VueSplitter, {VueSplitterH, VueSplitterV} from 'vue-vue-splitter'
Vue.extend({
  ...,
  components:  {
    VueSplitter,       // registers vue-splitter, must provide orientation
    VueSplitterV,      // registers vue-splitrer-v, for side by side arrangement
    VueSplitterH       // registers vue-splitter-h for top/bottom arrangement
  }
})
```

### Examples

#### Using `vue-splitter`
```html
   <vue-splitter split="vertical">
      <template slot="left">
        content...
      </template>
      <template slot="right">
        content...
      </template>
    </vue-splitter>
```

#### Using `vue-splitter-h`
```html
    <vue-splitter-h>
       <template slot="top">
        content...
       </template>
       <template slot="bottom">
        content...
       </template>
     </vue-splitter>
```

#### Nested
```html
  //nested
  <vue-splitter-v initial-size="40%">
    <template slot="left"> A </template>
    <template slot="right">
      <vue-splitter-h>
        <template slot="top">
          <vue-splitter-v initial-size="60%">
            <template slot="left">B</template>
            <template slot="right">C</template>
          </vue-splitter-v>
        </template>
        <template slot="bottom">
          <vue-splitter-v :throttle="20" initial-size="200px">
            <template slot="left">D</template>
            <template slot="right">E</template>
          </vue-splitter-v>
        </template>
      </vue-splitter-h>
    </template>
  </vue-splitter-v>
```

### Slot Names
|    Splitter Type    |    First Slot   |   Second Slot   |
| -----------------  | ---------------- | :--------: |
| vertical       | `left` |  `right` |
| horizontal       | `top` |  `bottom` |

### Events
* `resize([size1, size2])`: Emitted when the panes are resized. `size1` and `size2` are the adjusted dimensions of the first and second pane, respectively (width for `vertical` and height for `horizontal`).


### Component Properties
|    Property    |    Description   |   type   |	default	|
| -----------------  | ---------------- | :--------: | :----------: |
| split       | Pane arrangement |`horizontal` , `vertical` | required |
| initial-size | Initial size of first slot | Any valid CSS size (e.g. px, %)| 50% |
| min-size | Lower size bound for the first slot  | Any valid CSS size (e.g. px, % )| 20% |
| min-size | Upper size bound for the first slot  | Any valid CSS size (e.g. px, %)| 80% |
| throttle | Throttle size updates to no more than given value | Rate in ms | - |
| x-class | Adds a classname | string | - |


### Styling
`vue-splitter-pane` includes the bare minimal styling to ensure functionality.

#### Container
* `.VueSplitter-Container-item`: the container
* `.VueSplitter-Container-[horizontal|vertical]`: specialization for split type
* value set via `x-class`

#### Panes
* `.VueSplitter-Pane-item`: the pane
* `.VueSplitter-Pane-[left|right|top|bottom]`: specialization by position
* value set via `x-class`

#### Handle
* `.VueSplitter-Handle-item`: the handle
* `.VueSplitter-Handle-[horizontal|vertical]`: specialization by split type
* value set via `x-class`


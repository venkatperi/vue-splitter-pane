# Vue Splitter Pane

`vue-splitter-pane` is a Vuejs component which renders two slots in a adjustable split arrangement (vetical or horizontal).

Uses `flex-box` for sizing.

### Installation & Usage
```bash
$ npm install vue-splitter-pane
```

#### Vue Global Usage
```javascript
import SplitterPane from 'vue-splitter-pane'
Vue.use(SplitterPane); # registers splitter-pane, splitter-pane-v and splitter-pane-h

```

#### Vue Local Usage
```javascript
import SplitterPane, {SplittePaneV, SplitterPaneH} from 'vue-splitter-pane'
Vue.extend({
  ...,
  components:  {
    SplitterPane,       // registers splitter-pane, must provide orientation
    SplitterPaneV,      // registers splitrer-pane-v, for side by side arrangement
    SplitterPaneH       // registers splitter-pane-h for top/bottom arrangement
  }
})
```

### Examples

#### Using `splitter-pane`
```html
   <splitter-pane split="vertical">
      <template slot="left">
        content...
      </template>
      <template slot="right">
        content...
      </template>
    </splitter-pane>
```

#### Using `splitter-pane-h`
```html
    <splitter-pane-h>
       <template slot="top">
        content...
       </template>
       <template slot="bottom">
        content...
       </template>
     </splitter-pane>
```

#### Nested
```html
  //nested
  <splitter-pane-v initial-size="40%">
    <template slot="left"> A </template>
    <template slot="right">
      <splitter-pane-h>
        <template slot="top">
          <splitter-pane-v initial-size="60%">
            <template slot="left">B</template>
            <template slot="right">C</template>
          </splitter-pane-v>
        </template>
        <template slot="bottom">
          <splitter-pane-v :throttle="20" initial-size="200px">
            <template slot="left">D</template>
            <template slot="right">E</template>
          </splitter-pane-v>
        </template>
      </splitter-pane-h>
    </template>
  </splitter-pane-v>
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
`splitter-pane` includes the bare minimal styling to ensure functionality.

* `.spliter-container[.vertical|.horizontal][.xclass]``: The outer container. `xclass` is a user supplied name.

* `.splitter-pane[.vertical|.horizontal].splitter-pane-[left|right|top|bottom][.xclass]`: Individual panes.
* `.splitter-pane-handle[.vertical|.horizontal][.xclass]`: The handle

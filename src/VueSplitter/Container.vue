<!--
  // Copyright 2018, Venkat Peri.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  -->

<!--suppress TypeScriptValidateTypes -->
<template>
  <div :class="[$style.item, $style[split],  xClass]"
       v-resize="updateSizes"
       @mouseup="onMouseUp"
       @mousemove="onMouseMove">

    <pane :position="slotOne"
          ref="one"
          :xClass="xClass"
          :split="split"
          :style="paneOneStyles">
      <slot :name="slotOne" />
    </pane>

    <handle :xClass="xClass"
            :split="split"
            @mousedown.native="onMouseDown"
            @dblclick.native="onDblClick" />

    <pane :position="slotTwo" ref="two" :xClass="xClass" :split="split">
      <slot :name="slotTwo" />
    </pane>

  </div>
</template>

<script lang="ts">
    import { Component, Lifecycle, p, Prop, Watch } from "av-ts";
    import Vue from 'vue'
    import resize from 'vue-resize-directive'
    import BaseComponent from "../BaseComponent";
    import Handle from './Handle.vue'
    import Pane from './Pane.vue'

    const debounce = require('lodash.debounce')

    type StyleType = 'width' | 'height'

    @Component({
        name: 'VueSplitter',
        components: {Handle, Pane},
        directives: {resize},
        props: {
            minSize: {
                type: [String, Number],
                default: '20%'
            },
            maxSize: {
                type: [String, Number],
                default: '80%'
            },
            initialSize: {
                type: [String, Number],
                default: '50%'
            },
        }
    })
    export default class Container extends BaseComponent {

        dragging: boolean = false

        hasMoved: boolean = false

        currentSize: string | number = '50%'

        sizes = [0, 0]

        handler: (e: MouseEvent) => void = this.doResize.bind(this)

        $refs!: {
            one: Vue,
            two: Vue,
        }

        minSize!: string | number

        maxSize!: string | number

        initialSize!: string | number

        @Prop throttle = p({
            type: Number,
            default: -1
        })

        @Watch('sizes')
        sizesChanged() {
            this.$emit('resize', this.sizes, this.type)
        }

        @Watch('currentSize')
        currentSizeChanged() {
            this.updateSizes()
        }

        @Watch('initialSize')
        initialSizeChanged() {
            this.currentSize = this.initialSize
        }

        @Watch('throttle')
        onThrottleChanged() {
            this.updateHandler()
        }

        updateHandler() {
            let self = this
            this.handler =
                this.throttle < 0
                ? this.doResize.bind(this) :
                debounce((e: MouseEvent) => self.doResize(e),
                    this.throttle, {
                        leading: true,
                        trailing: true,
                        maxWait: this.throttle
                    })
        }

        @Lifecycle
        created() {
            this.currentSize = this.initialSize
            this.updateHandler()
        }

        @Lifecycle
        mounted() {
            this.updateSizes()
        }

        get paneOneStyles(): any {
            let s = {
                [this.type]: this.currentSize
            }
            if (this.minSize) {
                s[`min-${this.type}`] = this.minSize
            }
            if (this.maxSize) {
                s[`max-${this.type}`] = this.maxSize
            }
            return s
        }

        get type(): StyleType {
            return this.split === 'vertical' ? 'width' : 'height'
        }

        get slotOne(): string {
            return this.split === 'vertical' ? 'left' : 'top'
        }

        get slotTwo(): string {
            return this.split === 'vertical' ? 'right' : 'bottom'
        }

        get isVertical(): boolean {
            return this.split === 'vertical'
        }

        updateSizes() {
            let one = this.$refs.one.$el
            let two = this.$refs.two.$el
            this.sizes =
                this.isVertical
                ? [one.clientWidth, two.clientWidth]
                : [one.clientHeight, two.clientHeight];
            this.$refs.one.$emit('resize')
            this.$refs.two.$emit('resize')
        }

        onDblClick() {
            if (!this.hasMoved) {
                this.currentSize = this.initialSize
            }
        }

        onMouseDown() {
            this.dragging = true
            this.hasMoved = false
        }

        onMouseUp() {
            this.dragging = false
        }

        onMouseMove(e: MouseEvent) {
            this.handler(e)
        }

        doResize(e: MouseEvent) {
            if (e.buttons === 0) {
                this.dragging = false
            }

            if (this.dragging && e.currentTarget &&
                e.currentTarget instanceof HTMLElement) {
                let t: HTMLElement = e.currentTarget
                let r = t.getBoundingClientRect()

                const [currentPage, targetOffset, offset] =
                    this.isVertical
                    ? [e.pageX, t.offsetWidth, window.pageXOffset + r.left]
                    : [e.pageY, t.offsetHeight, window.pageYOffset + r.top]

                let diff = currentPage - offset
                this.currentSize = `${(diff / targetOffset) * 100}%`

                this.hasMoved = true
            }
        }

    }
</script>

<style lang="scss" module>

  .item {
    height: 100%;
    width: 100%;
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .horizontal {
    flex-direction: column;
  }

  .vertical {
    flex-direction: row;
  }

</style>


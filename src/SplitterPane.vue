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
  <div :style="{ cursor, userSelect}"
       :class="['splitter-container', 'clearfix', split, xClass]"
       v-resize="updateSizes"
       @mouseup="onMouseUp"
       @mousemove="onMouseMove">

    <pane position="one"
          ref="one"
          :xClass="xClass"
          :split="split"
          :style="{ [type]: `${percent}%`}">
      <slot :name="slotOne" />
    </pane>

    <resize-handle :xClass="xClass"
                   :split="split"
                   @mousedown.native="onMouseDown"
                   @click.native="onClick" />

    <pane position="two"
          ref="two"
          :xClass="xClass"
          :split="split"
          :style="{ [type]: `${100-percent}%`}">
      <slot :name="slotTwo" />
    </pane>

  </div>
</template>

<script lang="ts">
    import { Component, Lifecycle, p, Prop, Watch } from "av-ts";
    import Vue from 'vue'
    import resize from 'vue-resize-directive'
    import Pane from './Pane.vue'
    import resizeHandle from './ResizeHandle.vue'

    const debounce = require('lodash.debounce')

    type StyleType = 'width' | 'height'

    @Component({
        name: 'SplitterPane',
        components: {resizeHandle, Pane},
        directives: {resize}
    })
    export default class SplitterPane extends Vue {

        dragging: boolean = false

        hasMoved: boolean = false

        percent: Number = 50

        sizes = [0, 0]

        handler: (e: MouseEvent) => void = this.doResize.bind(this)

        $refs!: {
            one: Vue,
            two: Vue,
        }

        @Prop minPercent = p({
            type: Number,
            default: 20,
        })

        @Prop throttle = p({
            type: Number,
            default: -1
        })

        @Prop maxPercent = p({
            type: Number,
            default: 80,
        })

        @Prop initialPercent = p({
            type: Number,
            default: 50,
        })

        @Prop split = p({
            type: String,
            required: true,
            validator(value) {
                return ['vertical', 'horizontal'].indexOf(value) >= 0
            },
        })

        @Prop xClass = p({
            type: String,
            default: '',
        })

        @Watch('sizes')
        sizesChanged() {
            this.$emit('resize', this.sizes, this.type)
        }

        @Watch('percent')
        percentChanged() {
            this.updateSizes()
        }


        @Watch('initialPercent')
        initialPercentChanged() {
            this.percent = this.initialPercent
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
            this.updateHandler()
        }

        @Lifecycle
        mounted() {
            this.percent = this.initialPercent
            this.updateSizes()
        }

        get userSelect(): string {
            return this.dragging ? 'none' : ''
        }

        get cursor(): string {
            return this.dragging ? 'col-resize' : ''
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
        }

        onClick() {
            if (!this.hasMoved) {
                this.percent = 50
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
            if (e.buttons === 0 || e.which === 0) {
                this.dragging = false
            }

            if (this.dragging &&
                e.currentTarget &&
                e.currentTarget instanceof HTMLElement) {
                let target: HTMLElement = e.currentTarget

                const currentPage = this.isVertical
                                    ? e.pageX : e.pageY

                const targetOffset = this.isVertical
                                     ? e.currentTarget.offsetWidth
                                     : e.currentTarget.offsetHeight

                // see: https://msdn.microsoft.com/en-us/library/hh781509(VS.85).aspx
                let rect = target.getBoundingClientRect()
                let offset = this.isVertical
                             ? window.pageXOffset + rect.left
                             : window.pageYOffset + rect.top

                let diff = currentPage - offset
                const percent = Math.floor(
                    (diff / targetOffset) * 10000) / 100

                this.percent = Math.max(this.minPercent,
                    Math.min(percent, this.maxPercent))
                this.hasMoved = true
            }
        }

    }
</script>

<style>

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .splitter-container {
    height: 100%;
    position: relative;
  }

  .splitter-container.vertical {
    display: flex;
  }
</style>

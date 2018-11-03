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
      <slot name="one" />
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
      <slot name="two" />
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

        active: boolean = false

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

        @Watch('throttle')
        onThrottleChanged() {
            this.throttleChanged()
        }

        throttleChanged() {
            let self = this
            this.handler = this.throttle < 0
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
            this.throttleChanged()
        }

        @Lifecycle
        mounted() {
            this.percent = this.initialPercent
            this.updateSizes()
        }

        get userSelect(): string {
            return this.active ? 'none' : ''
        }

        get cursor(): string {
            return this.active ? 'col-resize' : ''
        }

        get type(): StyleType {
            return this.split === 'vertical' ? 'width' : 'height'
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
            this.active = true
            this.hasMoved = false
        }


        onMouseUp() {
            this.active = false
        }

        onMouseMove(e: MouseEvent) {
            this.handler(e)
        }

        doResize(e: MouseEvent) {
            if (e.buttons === 0 || e.which === 0) {
                this.active = false
            }

            if (this.active &&
                e.currentTarget &&
                e.currentTarget instanceof HTMLElement) {
                let offset = 0
                let target: HTMLElement = e.currentTarget

                const currentPage = this.isVertical
                                    ? e.pageX : e.pageY

                const targetOffset = this.isVertical
                                     ? e.currentTarget.offsetWidth
                                     : e.currentTarget.offsetHeight

                while (target) {
                    offset += this.isVertical
                              ? target.offsetLeft
                              : target.offsetTop
                    if (!(target.offsetParent && target.offsetParent
                        instanceof HTMLElement)) {
                        break
                    }
                    target = target.offsetParent
                }


                let diff = currentPage - offset
                const percent = Math.floor(
                    (diff / targetOffset) * 10000) / 100

                if (percent > this.minPercent &&
                    percent < this.maxPercent) {
                    this.percent = percent
                }

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

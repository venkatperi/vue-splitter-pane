<template>
  <div :class="['splitter-pane-handle', split, xClass]"></div>
</template>

<script lang="ts">
    import { Component, p, Prop } from "av-ts";
    import Vue from 'vue'

    @Component({
        name: 'ResizeHandle'
    })
    export default class ResizeHandle extends Vue {
        @Prop xClass = p({
            type: String,
        })

        @Prop split = p({
            type: String,
            required: true,
            validator(value) {
                return ['vertical', 'horizontal'].indexOf(value) >= 0
            },
        })
    }
</script>

<style lang="scss">

  $handle-size: 5;
  $handle-half-size: floor($handle-size/2) + 0px;
  $border-color: rgba(255, 255, 255, 0);

  .splitter-pane-handle {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #000;
    opacity: .2;
    z-index: 1;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .splitter-pane-handle.horizontal {
    height: $handle-size + 0px;
    margin-top: -$handle-half-size;
    border-top: $handle-half-size solid $border-color;
    border-bottom: $handle-half-size solid $border-color;
    cursor: row-resize;
    width: 100%;
  }

  .splitter-pane-handle.vertical {
    width: $handle-size + 0px;
    height: 100%;
    margin-left: -$handle-half-size;
    border-left: $handle-half-size solid $border-color;
    border-right: $handle-half-size solid $border-color;
    cursor: col-resize;
  }
</style>


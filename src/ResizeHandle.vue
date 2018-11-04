<!--suppress CheckEmptyScriptTag -->
<template>
  <div :class="['splitter-pane-handle', split, xClass]" />
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

  $handle-size: 9;
  $handle-half-size: floor($handle-size/2) + 0px;
  $border-color: rgba(0, 0, 0, 0.0);

  .splitter-pane-handle {
    background: #000;
    opacity: .2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
    width: 100%;
    height: 100%;
    border: $handle-half-size solid $border-color;

    &.horizontal {
      height: $handle-size + 0px;
      margin-top: -$handle-half-size;
      margin-bottom: -$handle-half-size;
      border-left: none;
      border-right: none;
      cursor: row-resize;
    }

    &.vertical {
      width: $handle-size + 0px;
      margin-left: -$handle-half-size;
      margin-right: -$handle-half-size;
      border-top: none;
      border-bottom: none;
      cursor: col-resize;
    }
  }
</style>


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

<!--suppress CheckEmptyScriptTag -->
<template>
  <!--suppress JSUnresolvedVariable -->
  <div :class="[$style.item, $style[split], xClass]" />
</template>

<script lang="ts">
    import { Component } from "av-ts";
    import BaseComponent from "../BaseComponent";

    @Component({name: 'Handle'})
    export default class Handle extends BaseComponent {
    }
</script>

<style lang="scss" module>

  $handle-size: 9;
  $handle-half-size: floor($handle-size/2) + 0px;
  $border-color: rgba(0, 0, 0, 0.0);

  .item {
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
  }

  .horizontal {
    height: $handle-size + 0px;
    margin-top: -$handle-half-size;
    margin-bottom: -$handle-half-size;
    border-left: none;
    border-right: none;
    cursor: row-resize;
  }

  .vertical {
    width: $handle-size + 0px;
    margin-left: -$handle-half-size;
    margin-right: -$handle-half-size;
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
  }

</style>


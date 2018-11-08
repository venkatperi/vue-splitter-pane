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
  <div
    :class="[$style.item, $style[split] ,
    $style[`size-${handleSize}-${split}`],
    xClass]" />
</template>

<script lang="ts">
    import { Component, p, Prop } from "av-ts";
    import BaseComponent from "../BaseComponent";

    @Component({name: 'Handle'})
    export default class Handle extends BaseComponent {
        @Prop handleSize = p({
            type: Number,
            default: 9,
        })
    }
</script>

<style lang="scss" module>

  $border-color: rgba(0, 0, 0, 0.0);
  $defaultSize: 9;

  @function halfSize($handle-size) {
    @return floor($handle-size/2) + 0px;
  }

  @function name($handle-size) {
    @return "size-#{$handle-size}"
  }

  @mixin makeItem($handle-size) {
    $handle-half-size: halfSize($handle-size) ;
    $name: name($handle-size);

    border: $handle-half-size solid $border-color;
  }

  @mixin makeH($handle-size) {
    $handle-half-size: halfSize($handle-size) ;
    $name: name($handle-size);

    height: $handle-size + 0px;
    margin-top: -$handle-half-size;
    margin-bottom: -$handle-half-size;
  }

  @mixin makeV($handle-size) {
    $handle-half-size: halfSize($handle-size) ;
    $name: name($handle-size);

    width: $handle-size + 0px;
    margin-left: -$handle-half-size;
    margin-right: -$handle-half-size;
  }

  @mixin makeHandle($handle-size) {
    $handle-half-size: halfSize($handle-size) ;
    $name: name($handle-size);

    .#{$name} {
      @include makeItem($handle-size);
    }

    div.#{$name}-horizontal {
      @include makeH($handle-size);
    }

    div.#{$name}-vertical {
      @include makeV($handle-size);
    }
  }

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

    //@include makeItem($defaultSize)
  }

  .horizontal {
    border-left: none;
    border-right: none;
    cursor: row-resize;
    //@include makeH($defaultSize)
  }

  .vertical {
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
    //@include makeV($defaultSize)
  }

  @for $s from 1 through 5 {
    @include makeHandle($s * 2 + 1)
  }


</style>


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

<template>
  <div :class="[$style.item, $style[position], xClass]">
    <slot />
  </div>
</template>

<script lang="ts">
    import { Component, p, Prop } from "av-ts";
    import BaseComponent from "../BaseComponent";

    @Component({name: 'Pane'})
    export default class Pane extends BaseComponent {
        @Prop position = p({
            type: String,
            required: true
        })
    }
</script>

<style module>
  .item {
    margin: 0;
    padding: 0;
    border: none;
    overflow: hidden;
  }

  .left, .top {
    flex: inherit;
  }

  .right, .bottom {
    flex: 1;
  }
</style>

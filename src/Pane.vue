<template>
  <div :class="['splitter-pane', split, xClass, `splitter-pane-${position}`]">
    <slot />
  </div>
</template>

<script lang="ts">


    import { Component, p, Prop } from "av-ts";
    import Vue from 'vue'

    @Component({
        name: 'Pane'
    })
    export default class Pane extends Vue {
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

        @Prop position = p({
            type: String,
            required: true
        })

    }
</script>

<style>
  .splitter-pane {
    overflow: hidden;
  }

  .splitter-pane.vertical {
    display: inline-block;
    height: 100%;
  }

  .splitter-pane.horizontal {
    display: block;
    width: 100%;
  }
</style>

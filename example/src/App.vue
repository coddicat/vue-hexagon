<template>
  <div id="app">
    <div class="column">
      <Hexagon @click="onClick('#1')">
        Default
      </Hexagon>
      <Hexagon
        @click="onClick('#2')"
        :background-image="`url(https://picsum.photos/id/10/100/100)`"
      >
        <span style="color: #0ff; text-align: center">Background Image</span>
      </Hexagon>
      <Hexagon
        @click="onClick('#3')"
        :border-size="10"
        :background-image="`url(https://picsum.photos/id/20/100/100)`"
      >
        <span style="color: #f0f">Border</span>
      </Hexagon>
    </div>
    <div class="column">
      <Hexagon
        @click="onClick('#4')"
        :content-style="{ transform: 'rotate(45deg)' }"
      >
        Content Style
      </Hexagon>
      <Hexagon @click="onClick('#5')" background-color="red">
        <span style="text-align: center">Background Color</span>
      </Hexagon>
      <Hexagon
        @click="onClick('#6')"
        :size="150"
        class="hexagon-custom"
        style="background-color: #ccc"
      >
        <span style="text-align: center">Custom Class &amp; Style</span>
      </Hexagon>
    </div>
    <div class="column">
      <Hexagon
        :size="200"
        @mousemove="(e) => onMouseEvent('mousemove', e)"
        @mouseover="(e) => onMouseEvent('mouseover', e)"
        @mouseout="(e) => onMouseEvent('mouseout', e)"
        @mousedown="(e) => onMouseEvent('mousedown', e)"
        @mouseup="(e) => onMouseEvent('mouseup', e)"
        @mousewheel="(e) => onMouseEvent('mousewheel', e)"
        @mouseenter="(e) => onMouseEvent('mouseenter', e)"
        @mouseleave="(e) => onMouseEvent('mouseleave', e)"
      >
        <span style="text-align: center">Event Handlers</span>
      </Hexagon>
      Event:
      {{ eventName }}<br />
      Data: {{ eventData }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//import Hexagon from "./dest/hexagon.vue";
export default Vue.extend({
  components: {
    //Hexagon,
  },
  data: () => ({
    eventName: "N/A",
    eventData: {},
  }),
  methods: {
    onClick(text: string): void {
      alert(`clicked: ${text}`);
    },
    onMouseEvent(name: string, evt: MouseEvent): void {
      this.eventName = name;
      this.eventData = {
        clientX: evt.clientX,
        clientY: evt.clientY,
        offsetX: evt.offsetX,
        offsetY: evt.offsetY,
        type: evt.type,
        target: evt.target
      };
      console.log(evt);
    },
  },
});
</script>

<style lang="scss">
.column {
  display: inline-block;
  margin-right: 50px;
  vertical-align: top;
  max-width: 250px;
}
.hexagon-custom {
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>

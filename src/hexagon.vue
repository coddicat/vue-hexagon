<template>
  <div class="coddicat_hexagon__wrapper" :style="wrapperStyle">
    <div
      class="coddicat_hexagon__border coddicat_hexagon"
      :style="borderStyles"
      v-if="borderSize > 0"
    ></div>
    <div
      :class="contentClass"
      class="coddicat_hexagon__content coddicat_hexagon"
      :style="contentStyles"
      @click="($e) => $emit('click', $e)"
      @mousedown="($e) => $emit('mousedown', $e)"
      @mouseup="($e) => $emit('mouseup', $e)"
      @mousewheel="($e) => $emit('mousewheel', $e)"
      @mousemove="($e) => $emit('mousemove', $e)"
      @mouseenter="($e) => $emit('mouseenter', $e)"
      @mouseover="($e) => $emit('mouseover', $e)"
      @mouseleave="($e) => $emit('mouseleave', $e)"
      @mouseout="($e) => $emit('mouseout', $e)"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default /*#__PURE__*/ Vue.extend({
  name: "hexagon",
  props: {
    borderSize: {
      type: Number,
      default: 1.5,
    },
    borderColor: {
      type: String,
      default: "#000",
    },
    size: {
      type: Number,
      default: 100,
    },
    backgroundColor: {
      type: String,
      default: "#fff",
    },
    backgroundImage: {
      type: String,
      default: undefined,
    },
    contentStyle: {
      type: Object,
      default: undefined,
    },
    contentClass: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    wrapperStyle(): any {
      const px = `${this.size}px`;
      return {
        width: px,
        height: px,
      };
    },
    contentStyles(): any {
      const px = `${this.size}px`;
      const innerStyles = {
        width: px,
        height: px,
        "background-color": this.backgroundColor,
        "background-image": this.backgroundImage,
      };
      return { ...innerStyles, ...this.contentStyle };
    },
    borderStyles(): any {
      const px = `${-this.borderSize}px`;
      return {
        top: px,
        right: px,
        bottom: px,
        left: px,
        "background-color": this.borderColor,
      };
    },
  },
});
</script>

<style lang="scss">
.coddicat_hexagon {
  content: "";
  position: absolute;
  display: block;
  clip-path: polygon(
    0% 50%,
    25% 6.7%,
    75% 6.7%,
    100% 50%,
    75% 93.3%,
    25% 93.3%
  );
  background-size: contain;
  margin: auto;
  user-select: none;

  &__content {
    background-size: contain;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  &__wrapper {
    position: relative;
    //margin: auto;
    //transform: translate(-50%, -50%);
    user-select: none;
  }
}
</style>

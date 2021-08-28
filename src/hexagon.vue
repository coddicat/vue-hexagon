<template>
  <div class="coddicat_hexagon__wrapper" :style="wrapperStyle">
    <div
      class="coddicat_hexagon__border coddicat_hexagon"
      :style="borderStyles"
      v-if="borderSize > 0"
    ></div>
    <div
      ref="content"
      :class="contentClass"
      class="coddicat_hexagon__content coddicat_hexagon"
      :style="contentStyles"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const events = [
  "click",
  "mousedown",
  "mouseup",
  "mousewheel",
  "mousemove",
  "mouseenter",
  "mouseover",
  "mouseleave",
  "mouseout",
];


@Component({
  name: "Hexagon",
})
export default class Hexagon extends Vue { 
  @Prop({ required: false, default: 1.5 }) private borderSize!: number;
  @Prop({ required: false, default: "#000" }) private borderColor!: string;
  @Prop({ required: false, default: 100 }) private size!: number;
  @Prop({ required: false, default: "#fff" }) private backgroundColor!: string;
  @Prop({ required: false, default: undefined }) private backgroundImage: string | undefined;
  @Prop({ required: false, default: undefined }) private contentStyle: object | undefined;
  @Prop({ required: false, default: undefined }) private contentClass: string | undefined;

  get wrapperStyle(): object {
    const px = `${this.size}px`;
    return {
      width: px,
      height: px,
    };
  }

  get contentStyles(): object {
    const px = `${this.size}px`;
    const innerStyles = {
      width: px,
      height: px,
      "background-color": this.backgroundColor,
      "background-image": this.backgroundImage,
    };
    return { ...innerStyles, ...this.contentStyle };
  }

  get borderStyles(): object {
    const px = `${-this.borderSize}px`;
    return {
      top: px,
      right: px,
      bottom: px,
      left: px,
      "background-color": this.borderColor,
    };
  }

  mounted(): void {
    const el = this.$refs.content as Element;
    events.forEach((event) => {
      if (this.$listeners[event]) {
        el.addEventListener(event, ($e: any) => this.$emit(event, $e));
      }
    });
  }
}
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

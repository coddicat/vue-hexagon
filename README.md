# vue-hexagon
Vue component to render div element as hexagon with inner content

#### example:
<img src="https://github.com/coddicat/vue-hexagon/blob/master/example/example.png" width="600"/>

## Installation
```
npm i @coddicat/vue-hexagon
```

## Usage
template:
```
<Hexagon
    @click="onClick"
    @mouseover="onMouseEvent"
    :size="150"
    :border-size="3"
    :background-image="`url(https://picsum.photos/id/20/100/100)`"
    border-color="#f00"
    class="hexagon-custom"
>
    <span style="color: #f0f">Inner Text</span>
</Hexagon>
```

script:
```
import Hexagon from "@coddicat/vue-hexagon";
export default Vue.extend({
  components: {
    Hexagon,
  },
  methods: {
    onClick(e: any): void {
      console.log(e);
    },
    onMouseEvent(e: MouseEvent): void {
      console.log(e);
    }
  }
})
```

## Props
|name|required|description|default|
|----|--------|-----------|-------|
|borderSize|no|border width in px|1.5|
|borderColor|no|border color|black|
|size|no|width & height in px|100|
|backgroundColor|no|background color|white|
|backgroundImage|no|content image|empty|
|contentStyle|no|css style (not border)|empty|
|contentClass|no|css class (not border)|empty|

## Events
- click
- mousedown
- mouseup
- mousewheel
- mousemove
- mouseenter
- mouseover
- mouseleave
- mouseout

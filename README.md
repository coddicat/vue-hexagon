# vue-hexagon
Vue component to render div element as hexagon with inner content

#### example:
https://vue-hexagon.coddicat.com/
<img src="https://github.com/coddicat/vue-hexagon/blob/master/example/example.png" width="600"/>

## Installation
```
npm i @coddicat/vue-hexagon
```

## Usage
template:
```html
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

type script:
```ts
import { Component, Vue } from "vue-property-decorator";
import Hexagon from "@coddicat/vue-hexagon";
@Component({
  name: "HexagonExample",
  components: {
    Hexagon
  }
})
export default class HexagonExample extends Vue { 
  public onClick(e: any): void {
    console.log(e);
  },
  public onMouseEvent(e: MouseEvent): void {
    console.log(e);
  }
}
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

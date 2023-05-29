다음과 같은 html 코드가 있을때
시작이 10시 종료가 23시 일떄
circle_green class 를 각 시간에 해당하는 시간의 위치에만 그리고 싶으면 어떻게 해야 하는지 알려줘

```html
<style>
  .left_time .svg .circle {
    fill: #fff;
    stroke: #a3a3a3;
    stroke-width: 1;
  }
  .left_time .svg_02 {
    position: absolute;
    width: 600px;
    height: 550px;
    /* transition: 0.5s; */
  }
  .left_time .svg_02 .circle_green {
    fill: #fff;
    stroke: #7dc183;
    stroke-width: 13;
    stroke-linecap: round;
    stroke-dasharray: 1030;
    stroke-dashoffset: 2400;
    /* transition: stroke-dashoffset 1.5s 0.5s, fill 0.7s 0.8s; */
  }
</style>
<div class="left_time">
  <svg class="svg">
    <circle cx="300" cy="275" r="170" class="circle"></circle>
  </svg>
  <svg class="svg_02">
    <circle cx="300" cy="275" r="170" class="circle_green"></circle>
  </svg>
</div>
```

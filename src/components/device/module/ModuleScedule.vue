<template lang="">
  <div class="left_time">
    <svg class="svg">
      <circle cx="300" cy="275" r="170" class="circle"></circle>
    </svg>
    <svg class="svg_02">
      <circle cx="300" cy="275" r="170" class="circle_green"></circle>
    </svg>
    <div class="circle_inner">
      <p>06:00 ~ 22:00</p>
    </div>
    <span class="time q_0">0</span>
    <span class="time q_6">6</span>
    <span class="time q_12">12</span>
    <span class="time q_18">18</span>
    <span class="time q_end">22</span>
  </div>
</template>
<script>
export default {
  props: { module: { type: Object } },
};
</script>
<style lang=""></style>

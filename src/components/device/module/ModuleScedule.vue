<template lang="">
  <div>
    <div class="left_time">
      <svg class="svg">
        <circle cx="300" cy="275" r="170" class="circle"></circle>
      </svg>
      <svg class="svg_02">
        <path :d="getPath" fill="#7dc183" />
        <circle cx="300" cy="275" r="158" fill="white"></circle>
        <!-- <circle cx="300" cy="275" r="170" class="circle_green"></circle> -->
      </svg>
      <div class="circle_inner">
        <p>{{ starDtm }} ~ {{ endDtm }}</p>
      </div>
      <span class="time q_0">0</span>
      <span class="time q_6">6</span>
      <span class="time q_12">12</span>
      <span class="time q_18">18</span>
    </div>
  </div>
</template>
<script>
import pathUtils from "./CirclePathCalc";
export default {
  props: {
    module: { type: Object, default: () => ({ start: "0000", end: "2300" }) },
  },
  watch: {},
  mounted() {},
  computed: {
    starDtm() {
      return this.module.start
        ? this.module.start.replace(/^(\d{2})(\d{2})$/, "$1:$2")
        : "";
    },
    endDtm() {
      return this.module.end
        ? this.module.end.replace(/^(\d{2})(\d{2})$/, "$1:$2")
        : "";
    },
    getPath() {
      const convertHHMMToNumber = (hhmm) => {
        if (!hhmm) {
          return 0;
        }
        var hours = parseInt(hhmm.substring(0, 2), 10);
        var minutes = parseInt(hhmm.substring(2), 10);
        var decimalHours = hours + minutes / 60;
        return decimalHours;
      };

      const perHourAxis = Math.floor(360 / 24);
      return this.module.start
        ? pathUtils(
            300,
            275,
            178,
            perHourAxis * convertHHMMToNumber(this.module.start),
            perHourAxis * convertHHMMToNumber(this.module.end)
          )
        : "";
    },
  },
};
</script>
<style scoped>
input {
  z-index: 1;
}
</style>

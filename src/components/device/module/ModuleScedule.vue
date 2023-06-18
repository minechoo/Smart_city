<template lang="">
  <div>
    <div class="left_time h_500">
      <svg class="svg">
        <circle cx="300" cy="275" r="170" class="circle" ></circle>
      </svg>
      <canvas width="600" height="550"  id="timeCanvas"></canvas>
      <!-- <svg class="svg_02">
      </svg> -->
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
// import pathUtils from "./CirclePathCalc";
export default {
  props: {
    module: { type: Object, default: () => ({ start: "0000", end: "2300" }) },
  },
  watch: {
    starDtm(){
      this.drawTimeArc()
    },

    endDtm(){
      this.drawTimeArc()
    }
  },
  mounted() {
    
  },
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
    
  },
  methods:{
    drawTimeArc() {
      const convertHHMMToNumber = (hhmm) => {
        if (!hhmm) {
          return 0;
        }
        var hours = parseInt(hhmm.substring(0, 2), 10);
        var minutes = parseInt(hhmm.substring(2), 10);
        var decimalHours = hours + minutes / 60; 
        return decimalHours;
      };

      const canvas = document.getElementById('timeCanvas');
      const ctx = document.getElementById('timeCanvas').getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.arc(300, 275, 156, (Math.PI/180) * (convertHHMMToNumber(this.module.start) * 15 - 90), (Math.PI/180) * (convertHHMMToNumber(this.module.end) * 15 - 90), false);
      ctx.strokeStyle = '#7dc183';
      ctx.lineWidth = 22;
      ctx.stroke();


      //  ctx.beginPath();
      //  ctx.arc(300, 275, 145, (Math.PI/180) * (0 * 15 - 90), (Math.PI/180) * (360* 15 - 90), false);
      //  ctx.strokeStyle = 'gray';
      //  ctx.lineWidth = .8;
      //  ctx.stroke();


     
    },
  }
};
</script>
<style scoped>
input {
  z-index: 1;
}
</style>

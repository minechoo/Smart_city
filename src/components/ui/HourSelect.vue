<template>
  <div>
    <label for="h_end">{{ title }}</label>
    <select id="h_start" class="pop_sel" :value="hour" @change="updateMyProp" >
      <option v-for="i in range(24)" v-bind:key="i" :value="i">{{ i }}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: { title: { type: String }, hour: { type: String } },
  mounted() {
   
  },
  methods: {
    range(end) {
      String.prototype.lpad = function (padLength, padString) {
        let arrTxt = this;
        while (arrTxt.length < padLength) arrTxt = padString + arrTxt;
        return arrTxt;
      };

      const arr = [];
      for (let i = 0; i < end; i++) {
        arr.push(("" + i).lpad(2, "0"));
      }
      return arr;
    },
    updateMyProp(event) {
      this.$emit('updateHour', event.target.value);
    }
  },
};
</script>
<style lang=""></style>

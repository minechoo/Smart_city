<template lang="">
  <li>
    <a @click="fnGoDetail"> {{ areaName }}</a>
  </li>
</template>
<script>
export default {
  props: {
    areaName: { type: String },
    areaId: { type: String },
    areaType: { type: String },
  },
  methods: {
    fnGoDetail: function () {
      console.log('on clicked : ' , this.areaId);
      this.$router.push(`/device/${this.areaType.toLowerCase()}/${this.areaId}`);
    },
  },
};
</script>
<style lang=""></style>

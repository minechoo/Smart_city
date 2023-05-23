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
      this.$router.push(`/device/${this.areaType}/${this.areaId}`);
    },
  },
};
</script>
<style lang=""></style>

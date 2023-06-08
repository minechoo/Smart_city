<template lang="">
  <div :class="{ btnArea :true , on : module.count > 0 }">
    <img :src="icoUrl" :class="{ svg_color : true  }" />
    <h3>{{ module.comCdNm }} ( {{ module.count }} )</h3>
  </div>
</template>
<script>
export default {
  props: { module: { type: Object } },
  data: () => ({}),
  computed: {
    icoUrl: function () {
      const imgCd = this.module.comCd.split("_")[1];
      return require(`@/style/images/svg/ico_menu_${imgCd}.svg`);
    },
  },
};
</script>
<style scoped>

</style>

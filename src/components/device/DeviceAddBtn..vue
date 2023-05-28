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
.btnArea {
  display: flex;
  min-width: 170px;
  height: 140px;
  border: 1px solid rgb(218, 217, 217);
  border-radius: 10px;
  color: #606060;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.on {
  background: #6a9a77;
  color: #fff;
}
.btnArea img {
  width: 80px;
  scale: 0.7;
}
 .btnArea:hover {
  scale: 0.97;

} 

.btnArea:active {
  scale: 0.9;
}
</style>

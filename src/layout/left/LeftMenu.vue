<template lang="">
  <section class="ab_spot">
    <div class="img_wrap">
      <img src="@/style/images/ico_stop_map.png" alt="지도" />
    </div>
    <h2>스마트 정류장</h2>
    <ul>
      <AreaItem class="area-item-pointer"
        v-for="item in areaList"
        v-bind:key="item.areaId"
        :areaName="item.areaName"
        :areaId="item.areaId"
        :areaType="item.areaType"
      />
    </ul>
    <span class="arrow on"></span>
  </section>
</template>
<script>
import AreaItem from "@/components/area/AreaItem.vue";
export default {
  components: { AreaItem },
  data() {
    return {
      areaList: [
        { areaId: "111", areaName: "00역 버스정류장1", areaType: "Spot" },
        { areaId: "112", areaName: "00역 버스정류장2", areaType: "Spot" },
        { areaId: "113", areaName: "00역 버스정류장3", areaType: "Spot" },
        { areaId: "114", areaName: "00역 버스정류장4", areaType: "Spot" },
        { areaId: "115", areaName: "00역 버스정류장5", areaType: "Spot" },
      ],
    };
  },
};
</script>
<style scoped>
.area-item-pointer {
    cursor: pointer;
}
</style>

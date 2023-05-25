<template lang="">
  <section class="ab_spot">
    <div class="img_wrap">
      <img src="@/style/images/ico_stop_map.png" alt="지도" />
    </div>
    <h2>스마트 정류장</h2>
    <ul>
      <AreaItem class="area-item-pointer"
        v-for="item in filteredAreaList()"
        v-bind:key="item.deviceId"
        :areaName="item.deviceName"
        :areaId="item.deviceId"
        :areaType="item.deviceType"
      />
    </ul>
    <span class="arrow on"></span>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import AreaItem from "@/components/area/AreaItem.vue";
export default {
  components: { AreaItem },
  data() {
    return { deviceType: '', areaList: [] }
  },
  mounted() {
    this.deviceType = this.$route.params.areaId;
  },
  computed: {
   
  }, methods: {
    ...mapGetters(['getDeviceList'])
    ,

    filteredAreaList() {
      const paramDeviceType = this.$route.params.areaId;
      return this.getDeviceList().filter(v => {
        return v.deviceType.toLowerCase() === paramDeviceType
      });
    }
  }

};
</script>
<style scoped>
.area-item-pointer {
  cursor: pointer;
}
</style>

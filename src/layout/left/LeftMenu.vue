<template lang="">
  <div class="dialog-dim" v-if="isModify">
    <DeviceModify @onClose="() => (isModify = false)" :deviceId="deviceId" />
  </div>
  <section class="ab_spot">
    <div class="img_wrap">
      <img
        :src="deviceImg"
        alt="지도"
        class="left-preview"
        @click="() => (isModify = true)"
      />
    </div>
    <h2>{{ deviceTypeNm }}</h2>
    <ul>
      <AreaItem
        class="area-item-pointer"
        v-for="item in filteredAreaList()"
        v-bind:key="item.deviceId"
        :areaName="item.deviceNm"
        :areaId="item.deviceId"
        :areaType="item.deviceCd"
        @click="getImages"
      />
    </ul>
    <span :class="{ arrow: true, on: filteredAreaList().length > 5 }"></span>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import AreaItem from "@/components/area/AreaItem.vue";
import DeviceModify from "@/view/device/DeviceModify.vue";
import ComApi from "@/service/ComApi";
export default {
  components: { AreaItem, DeviceModify },
  data() {
    return {
      deviceType: "",
      areaList: [],
      deviceImg: "",
      isModify: false,
    };
  },
  watch: {
    deviceId() {
      this.getImages();
    },
  },
  mounted() {
    this.deviceType = this.$route.params.deviceCd;
    this.deviceImg = require("@/style/images/ico_stop_map.png");
    this.getImages();
  },
  computed: {
    deviceId() {
      return this.$route.params.deviceId;
    },
    deviceCd() {
      return this.$route.params.deviceCd;
    },
    deviceTypeNm() {
      const codes = this.getComDeviceType();
      const currlist = codes.filter(
        (v) => v.comCd.toLowerCase() === this.deviceCd
      );
      return currlist.length > 0 ? currlist[0].comCdNm : "";
    },
  },
  methods: {
    ...mapGetters(["getDeviceList", "getComDeviceType"]),
    async getImages() {
      const { data } = await ComApi.get(
        "/device/images/" + this.$route.params.deviceId
      );

      this.deviceImg = data;

      if (!this.deviceImg) {
        this.deviceImg = require("@/style/images/ico_stop_map.png");
      }
    },

    filteredAreaList() {
      const paramDeviceType = this.$route.params.deviceCd;
      return this.getDeviceList().filter((v) => {
        return v.deviceCd.toLowerCase() === paramDeviceType;
      });
    },
  },
};
</script>
<style scoped>
.area-item-pointer {
  cursor: pointer;
}
.left-preview {
  border-radius: 15px;
  width: 100%;
  height: inherit;
}
</style>

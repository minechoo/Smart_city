<template lang="">
 
  <div class="menu_box">
    <div class="menu_box_inner">
      <DeviceMainItem
        v-for="device in list"
        v-bind:key="device.id"
        :stat="device.stat"
        :name="device.name"
        :type="''+device.type"
        :deviceId="device.deviceId"
      />
      <div class="go add">
        <button>추가하기</button>
      </div>
    </div>
  </div>
</template>
<script>
import DeviceMainItem from "@/components/device/DeviceMainItem.vue";
export default {
  components: {
    DeviceMainItem,
  },
  data() {
    return {
      list: [
        { id: "1", deviceId: "101010", stat: true, name: "개폐장치", type: 1 },
        { id: "2", deviceId: "101010", stat: false, name: "냉난방", type: 2 },
        { id: "3", deviceId: "101010", stat: true, name: "공기정화", type: 3 },
        { id: "4", deviceId: "101010", stat: true, name: "DID", type: 4 },
        { id: "5", deviceId: "101010", stat: false, name: "조명", type: 5 },
        { id: "6", deviceId: "101010", stat: false, name: "CCTV", type: 6 },
        { id: "7", deviceId: "101010", stat: true, name: "온열의자", type: 7 },
        { id: "8", deviceId: "101010", stat: true, name: "전동어닝", type: 8 },
        { id: "9", deviceId: "101010", stat: true, name: "비상벨", type: 9 },
        {
          id: "9",
          deviceId: "101010",
          stat: true,
          name: "미세먼지표출기",
          type: 10,
        },
      ],
    };
  },
};
</script>
<style lang=""></style>

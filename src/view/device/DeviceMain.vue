<template lang="">
  <div class="menu_box p_40_140">
    <div class="menu_box_inner">
      <DeviceMainItem
        v-for="device in list"
        v-bind:key="device.id"
        :stat="device.stat"
        :name="device.moduleNm"
        :type="device.moduleCd"
        :deviceId="device.deviceId"
        @click="fnShowDetail"
      />
      <div class="go add" @click="showAddDialog">
        <button>추가하기</button>
      </div>
    </div>
  </div>
  <transition>
    <div class="dialog-dim" v-if="showDeviceAdd">
      <DeviceModuleAdd @onClose="fnAddClosed" :deviceId="deviceId" />
    </div>
  </transition>
  <transition>
    <div class="dialog-dim" v-if="isShowDetail">
      <DeviceDetailDialog @onClose="()=>isShowDetail = false" :deviceId="deviceId" />
    </div>
  </transition>
</template>
<script>
import DeviceMainItem from "@/components/device/DeviceMainItem.vue";
import DeviceModuleAdd from "@/view/device/DeviceModuleAdd.vue";
import DeviceDetailDialog from '@/view/device/DeviceDetailDialog.vue';
import ComApi from "@/service/ComApi";
export default {
  components: {
    DeviceMainItem,
    DeviceModuleAdd,
    DeviceDetailDialog,
  },
  data() {
    return {
      showDeviceAdd: false,
      isShowDetail: false,
      list: [],
    };
  },
  watch: {
    $route(to, form) {
      if (to.path !== form.path) {
        this.fnSearchModuleList();
      }
    },
  },
  computed: {
    deviceId() {
      return this.$route.params.deviceId;
    },
  },
  mounted() {
    this.fnSearchModuleList();
  },
  methods: {
    fnAddClosed() {
      this.showDeviceAdd = false;
      this.fnSearchModuleList();
    },
    showAddDialog() {
      this.showDeviceAdd = true;
    },
    fnShowDetail(){
      this.isShowDetail = true;
    },
    async fnSearchModuleList() {
      const { data } = await ComApi.post("/device/module/list", {
        deviceId: this.$route.params.deviceId,
      });
      this.list = data;
    },
  },
};
</script>
<style lang=""></style>

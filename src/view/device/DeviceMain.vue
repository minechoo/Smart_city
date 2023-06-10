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
        :moduleId="device.moduleId"
        :start="device.start"
        :end="device.end"
        @showModifyDialog="showModifyDialog"
        @fnReflesh="fnSearchModuleList"
        @showDetails="(moduleId) => fnShowDetail(moduleId)"
      />
      <div class="go add" @click="showAddDialog">
        <button>추가하기</button>
      </div>
    </div>
  </div>
  <transition>
    <Teleport to="#app">
      <div class="dialog-dim" v-if="showDeviceAdd">
        <DeviceModuleAdd @onClose="fnAddClosed" :deviceId="deviceId" />
      </div>
    </Teleport>
  </transition>
  <transition>
    <Teleport to="#app">
      <div class="dialog-dim" v-if="isShowDetail">
        <DeviceDetailDialog
          @onClose="fnHideDetail"
          :deviceId="deviceId"
          :moduleId="selectedModuleId"
        />
      </div>
    </Teleport>
  </transition>
  <transition>
    <Teleport to="#app">
      <div class="dialog-dim" v-if="isShowModify">
        <ModuleModify :module="selectModuleObj" @onClose="hideModify" />
      </div>
    </Teleport>
  </transition>
</template>
<script>
import DeviceMainItem from "@/components/device/DeviceMainItem.vue";
import DeviceModuleAdd from "@/view/device/DeviceModuleAdd.vue";
import DeviceDetailDialog from "@/view/device/module/DeviceDetailDialog.vue";
import ModuleModify from "@/components/device/ModuleModify.vue";
import ComApi from "@/service/ComApi";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DeviceMainItem,
    DeviceModuleAdd,
    DeviceDetailDialog,
    ModuleModify,
  },
  data() {
    return {
      showDeviceAdd: false,
      isShowDetail: false,
      isShowModify: false,
      selectedModuleId: "",
      selectModuleObj :{},
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
    ...mapGetters(["getUserInfo"]),
    deviceId() {
      return this.$route.params.deviceId;
    },
  },
  mounted() {
    this.fnSearchModuleList();
  },
  methods: {
    ...mapActions(["connectSocket", "getStatus"]),
    fnAddClosed() {
      this.showDeviceAdd = false;
      this.fnSearchModuleList();
    },
    showAddDialog() {
      this.showDeviceAdd = true;
    },
    showModify() {
      this.isShowModify = true;
    },
    hideModify() {
      this.isShowModify = false;
      this.fnSearchModuleList();
    },
    showModifyDialog(moduleId) {
      console.log('call modify module id : ' , moduleId);
      this.isShowModify = true;
      this.selectedModuleId = moduleId;
      this.selectModuleObj =  this.list.find(v => v.moduleId === this.selectedModuleId);


    },
    fnShowDetail(moduleId) {
      console.log("called moduleId : ", moduleId);
      this.selectedModuleId = moduleId;
      this.isShowDetail = true;
    },
    fnHideDetail() {
      this.isShowDetail = false;
      this.fnSearchModuleList();
    },
    async fnSearchModuleList() {
      this.connectSocket(this.$route.params.deviceId);

      const { data } = await ComApi.post("/api/device/module/list", {
        deviceId: this.$route.params.deviceId,
      });

      console.log("received moduel List : ", data);

      this.list = data;
      this.getStatus({
        userId: this.getUserInfo.userId,
        deviceId: this.deviceId,
      });
    },
  },
};
</script>
<style lang=""></style>

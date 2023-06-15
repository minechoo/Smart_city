<template lang="">
  <transition>
    <div class="menu_box p_40_140">
      <div class="menu_box_inner">
        <DeviceMainItem
          v-for="device in getModuleList"
          v-bind:key="device.id"
          :stat="device.status"
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

      <Teleport to="#app">
        <transition>
          <div class="dialog-dim" v-if="showDeviceAdd">
            <DeviceModuleAdd @onClose="fnAddClosed" :deviceId="deviceId" />
          </div>
        </transition>

        <transition>
          <div class="dialog-dim" v-if="isShowDetail">
            <DeviceDetailDialog
              @onClose="fnHideDetail"
              :deviceId="deviceId"
              :moduleId="selectedModuleId"
            />
          </div>
        </transition>
        <transition>
          <div class="dialog-dim" v-if="isShowModify">
            <ModuleModify :module="selectModuleObj" @onClose="hideModify" />
          </div>
        </transition>
      </Teleport>
    </div>
  </transition>
</template>
<script>
import DeviceMainItem from "@/components/device/DeviceMainItem.vue";
import DeviceModuleAdd from "@/view/device/DeviceModuleAdd.vue";
import DeviceDetailDialog from "@/view/device/module/DeviceDetailDialog.vue";
import ModuleModify from "@/components/device/ModuleModify.vue";

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
      selectModuleObj: {},
    };
  },
  watch: {
    $route(to, form) {
      if (to.path !== form.path) {
        this.searchModuleList();
        //  this.fnSearchModuleList({deviceId :this.deviceId});
      }
    },
    isShowDetail(){
      if(this.isShowDetail){
        //window.overflow = 'hidden'
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = 'auto';
      }
    }
  },
  computed: {
    ...mapGetters(["getUserInfo", "getModuleList"]),
    deviceId() {
      return this.$route.params.deviceId;
    },
  },
  mounted() {
    // 화면 로드 이후 모듈 정보 조회
    this.searchModuleList();
  },
  methods: {
    ...mapActions([
      "connectSocket",
      "getStatus",
      "getModuleList",
      "fnSearchModuleList",
    ]),

    // 기기추가 팝업 닫기
    fnAddClosed() {
      this.showDeviceAdd = false;
      this.searchModuleList();
    },
    // 기기 추가 팝업 표시
    showAddDialog() {
      this.showDeviceAdd = true;
    },
    // 모듈 수정 팝업 열기
    showModify() {
      this.isShowModify = true;
    },
    // 모듈 수정 팝업 닫기
    hideModify() {
      this.isShowModify = false;
      this.searchModuleList();
      // 모듈 정보 수정 팝업
    },
    showModifyDialog(moduleId) {
      this.isShowModify = true;
      this.selectedModuleId = moduleId;
      this.selectModuleObj = this.getModuleList.find(
        (v) => v.moduleId === this.selectedModuleId
      );
    },
    fnShowDetail(moduleId) {
      this.selectedModuleId = moduleId;
      this.isShowDetail = true;
    },
    fnHideDetail() {
      this.isShowDetail = false;
    },

    async searchModuleList() {
      this.deviceId = this.$route.params.deviceId;
      if (!this.deviceId) {
        return;
      }

      await this.fnSearchModuleList({ deviceId: this.deviceId });
      this.connectSocket(this.$route.params.deviceId);
      setTimeout(() => {
        try {
          this.getStatus({
            userId: this.getUserInfo.userId,
            deviceId: this.deviceId,
          });
        } catch (e) {
          console.log(e);
        }
      }, 500);
    },
  },
};
</script>
<style lang=""></style>

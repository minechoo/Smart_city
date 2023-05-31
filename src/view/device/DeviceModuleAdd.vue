<template lang="">

    <div class="ab_membership" v-if="moduleList.length > 0">
      <div>
        <header>
          <div class="header">
            <h1>원격제어 기기 추가하기 </h1>
          </div>
        </header>
        <div class="tabs">
          <div class="ad_module_area">
            <DeviceAddBtn
              v-for="mod in moduleList"
              v-bind:key="mod.comCd"
              @click="() => fnAdd(mod.comCd)"
              :module="mod"
            />
          </div>
          <div class="btn_area">
            <button class="btn grey_line mr_17" @click="() => $emit('onClose')">
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
 
</template>
<script>
import DeviceAddBtn from "@/components/device/DeviceAddBtn..vue";
import { mapGetters } from "vuex";
import comApi from "@/service/ComApi";
export default {
  components: { DeviceAddBtn },
  props: { deviceId: { type: String } },
  data: () => ({
    list: [],
    existList: [],
    moduleList : []
  }),
  
  computed: {
    ...mapGetters(["getComCode"]),
  },
  mounted() {
    this.fnSearchModuleList();
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        this.fnClose();
      }
    });
  },
  methods: {
    fnClose(){
      this.$emit('onClose');
    },
    fnGetModuleList() {
      return this.getComCode
        .filter((v) => v.comGrpCd === "MODULE_CD")
        .map((v) => {
          const hasCount = this.list.filter(
            (m) => m.moduleCd === v.comCd
          ).length;
          v.count = hasCount;
          return v;
        });
    },
    async fnSearchModuleList() {
      const { data } = await comApi.post("/api/device/module/list", {
        deviceId: this.deviceId,
      });
      this.list = data;
     
      this.moduleList = this.fnGetModuleList();
     
    },
    async fnAdd(moduleCd) {
      const param = { deviceId: this.deviceId, moduleCd, datFlag: "I" };
      const { data } = await comApi.post("/api/device/module/process", param);
      console.log(data);
      this.$emit('onClose');
    },
  },
};
</script>
<style scoped>
.ad_module_area {
  width: 100%;
  height: 400px;
  display: flex;
  -moz-column-count: 5;
  column-count: 5;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: hidden;
}
</style>

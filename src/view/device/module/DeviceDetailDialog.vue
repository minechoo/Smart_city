<template lang="">
  <div class="stop_wrap">
    <div class="menu_box">
      <header class="group">
        <h2>{{ deviceNm }} {{moduleCd}} : {{moduleNo}}</h2>
        <button class="btn_close" @click="fnClose"></button>
      </header>

      <div class="sub_wrap">
        <nav>
          <ul ref="selectedLi">
            <li
              :class="{ on: v.moduleId === selectedModuleId }"
              v-for="v in list"
              v-bind:key="v.moduleId"
              :ref="'li_' + v.moduleId"
              @click="() => fnChangeModuleId(v.moduleId)"
            >
              <a href="#">{{ v.moduleNm }}</a>
            </li>
          </ul>
          <button class="arrow" v-if="list.length > 6"></button>
        </nav>

        <!-- 자동문  -->
        <ModuleType01 v-if="moduleCd === 'MOD_01'" :module="selectedModule" />
        <!-- 냉난방  -->
        <ModuleType02 v-if="moduleCd === 'MOD_02'" :module="selectedModule" />
        <!-- 공기정화 -->
        <ModuleType03 v-if="moduleCd === 'MOD_03'" :module="selectedModule" />
        <!-- DID -->
        <ModuleType04 v-if="moduleCd === 'MOD_04'" :module="selectedModule" />
        <!-- 조명 -->
        <ModuleType05 v-if="moduleCd === 'MOD_05'" :module="selectedModule" />
        <!-- CCTV -->
        <ModuleType06 v-if="moduleCd === 'MOD_06'" :module="selectedModule" />
        <!-- 온열의자 -->
        <ModuleType07 v-if="moduleCd === 'MOD_07'" :module="selectedModule" />
        <!-- 전동어닝 -->
        <ModuleType08 v-if="moduleCd === 'MOD_08'" :module="selectedModule" />
        <!-- 비상벨  -->
        <ModuleType09 v-if="moduleCd === 'MOD_09'" :module="selectedModule" />
        <!-- 미세먼지 -->
        <ModuleType10 v-if="moduleCd === 'MOD_10'" :module="selectedModule" />

        <!-- 태양광 -->
        <ModuleType11 v-if="moduleCd === 'MOD_11'" :module="selectedModule" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ComApi from "@/service/ComApi";
import ModuleType01 from "@/view/device/module/ModuleType01.vue";
import ModuleType02 from "@/view/device/module/ModuleType02.vue";
import ModuleType03 from "@/view/device/module/ModuleType03.vue";
import ModuleType04 from "@/view/device/module/ModuleType04.vue";
import ModuleType05 from "@/view/device/module/ModuleType05.vue";
import ModuleType06 from "@/view/device/module/ModuleType06.vue";
import ModuleType07 from "@/view/device/module/ModuleType07.vue";
import ModuleType08 from "@/view/device/module/ModuleType08.vue";
import ModuleType09 from "@/view/device/module/ModuleType09.vue";
import ModuleType10 from "@/view/device/module/ModuleType10.vue";
import ModuleType11 from "@/view/device/module/ModuleType11.vue";
export default {
  components: {
    ModuleType01,
    ModuleType02,
    ModuleType03,
    ModuleType04,
    ModuleType05,
    ModuleType06,
    ModuleType07,
    ModuleType08,
    ModuleType09,
    ModuleType10,
    ModuleType11
  },
  data() {
    return {
      selectedModuleId: "",
      moduleCd: "",
      moduleNo:'',
      list: [],
    };
  },
  props: {
    moduleId: { type: String },
  },
  watch: {},
  created() {
    this.fnSearchModuleList();
  },
  mounted() {
    this.selectedModuleId = this.moduleId;

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.fnClose();
      }
    });
  },
  computed: {
    deviceId() {
      return this.$route.params.deviceId;
    },

    deviceNm() {
      const deviceInfo = this.getDeviceList.find(
        (v) => v.deviceId === this.deviceId
      );
      return deviceInfo.deviceNm;
    },
    selectedModule() {
      return this.list.find((v) => v.moduleId === this.selectedModuleId);
    },

    ...mapGetters(["getDeviceList"]),
  },

  methods: {
    scrollToSelectedLi() {
      const el = this.$refs.selectedLi;

      setTimeout(() => {
        const selectedIdx = this.list.findIndex(
          (v) => v.moduleId === this.selectedModuleId
        );
        el.scrollTop = selectedIdx * 64;
      }, 200);
    },

    isValidModule(moduleCd) {
     
      return (
        this.list.find((v) => v.moduleCd === moduleCd).moduleCd === moduleCd
      );
    },
    fnClose() {
      this.$emit("onClose");
    },
    fnChangeModuleId(moduleId) {
      
      this.selectedModuleId = moduleId;
      
      const selectedModule  = this.list.find((v) => v.moduleId === moduleId);
      this.moduleCd = selectedModule.moduleCd;
      this.moduleNo = selectedModule.moduleNo;

      console.log( moduleId , this.moduleCd );
    },
    async fnSearchModuleList() {
      const { data } = await ComApi.post("/api/device/module/list", {
        deviceId: this.$route.params.deviceId,
      });
      this.list = data;
      this.moduleCd = this.list.find(
        (v) => v.moduleId === this.moduleId
      ).moduleCd;

      this.scrollToSelectedLi();
    },
    fnAddClosed() {},
  },
};
</script>
<style scoped>
.wid_70vw {
  width: 70vw;
  padding: 20px;
}
</style>

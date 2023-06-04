<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" @changeSchedule="fnChangeSchele" />

    <ModuleSceduleList :module="currentModule" @changeSchedule="fnChangeSchele">
      <div>
        <div class="power_3col">
          <h4>공기정화시스템 전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                class="on_green"
                value="ON"
                v-model="power"
                checked
              />
              <label for="on_green">ON</label>
            </div>
            <div class="off_grey">
              <input
                type="radio"
                name="power"
                id="off_grey"
                class="off_grey"
                v-model="power"
                value="OFF"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
        <div class="power_3col status_air q_04">
          <!-- 
                    상태 : 클래스명
                    좋음 : q_01
                    보통 : q_02
                    나쁨 : q_03
                    매우 나쁨 : q_04
                   -->
          <div class="quality">
            <h4>좋음</h4>
            <p>일상적인 실외활동이<br />가능합니다.</p>
          </div>
          <div class="status_graph">
            <img
              src="@/style/images/svg/ico_status.svg"
              alt="대기질 상태 그래프"
            />
            <div class="ab_arrow">
              <img
                src="@/style/images/svg/ico_status_arrow.svg"
                alt="대기질 상태 그래프"
              />
            </div>
          </div>
        </div>
      </div>
    </ModuleSceduleList>
  </div>
</template>
<script>
import ComApi from "@/service/ComApi";
import ModuleScedule from "@/components/device/module/ModuleScedule.vue";
import ModuleSceduleList from "@/components/device/module/ModuleSceduleList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { ModuleScedule, ModuleSceduleList },
  props: { module: { type: Object } },
  data: () => ({
    power: "OFF",
    isMount: false,
    currentModule: {},
  }),
  watch: {
    power() {
      if (this.isMount) {
        //this.fnSave();
        const command = {
          userId: this.getUserInfo.userId,
          deviceId: this.currentModule.deviceId,
          moduleId: this.currentModule.moduleId,
        };
        if (this.light === "ON") {
          this.commandOn(command);
        } else {
          this.commandOff(command);
        }
      }
    },
  },
  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.start || "2300";
    setTimeout(() => {
      this.isMount = true;
    }, 100);
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  methods: {
    ...mapActions(["commandOn", "commandOff", "commandCron"]),
    fnChangeSchele(start, end) {
      this.currentModule.start = start;
      this.currentModule.end = end;

      this.currentModule.start = start;
      this.currentModule.end = end;
      const command = {
        userId: this.getUserInfo.userId,
        deviceId: this.currentModule.deviceId,
        moduleId: this.currentModule.moduleId,
        start,
        end,
      };
      this.commandCron(command);
    },
    async fnSave() {
      const param = { ...this.currentModule, datFlag: "U" };
      console.log("call save : ", param);
      const { data } = await ComApi.post("/api/device/module/process", param);
      console.log(data);
    },
  },
};
</script>
<style lang=""></style>

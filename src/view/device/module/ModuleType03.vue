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
        <div :class="getStatClass">
          <!-- 
                    상태 : 클래스명
                    좋음 : q_01
                    보통 : q_02
                    나쁨 : q_03
                    매우 나쁨 : q_04
                   -->
          <div class="quality">
            <h4>{{ getStatNm }}</h4>
            <p v-html="getStatComment"></p>
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
const airCondition = {
  "01": {
    statNm: "좋음",
    comment: "일상적인 실외활동이<br />가능합니다.",
  },
  "02": {
    statNm: "보통",
    comment: "일상적인 실외활동이<br />가능합니다.",
  },
  "03": {
    statNm: "나쁨",
    comment:
      "무리한 실외 활동을 줄이거나 <br />다른 날로 일정을 잡는것이 좋습니다.",
  },
  "04": {
    statNm: "매우 나쁨",
    comment:
      "실내 활동이 좋으며 어린이, <br /> 노인은 실외 활동을 피하는것을 권합니다.",
  },
};
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
    this.currentModule.end = this.module.end || "2300";
    this.currentModule.stat = this.module.stat || "01";
    setTimeout(() => {
      this.isMount = true;
    }, 100);
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
    getStatClass() {
      const currStat = this.currentModule.stat || "02";

      let rtnClass = {
        power_3col: true,
        status_air: true,
        q_01: currStat === "01",
        q_02: currStat === "02",
        q_03: currStat === "03",
        q_04: currStat === "04",
      };
      return rtnClass;
    },
    getStatNm() {
      const currStat = this.currentModule.stat || "02";
      return airCondition[currStat].statNm;
    },
    getStatComment() {
      const currStat = this.currentModule.stat || "02";
      return airCondition[currStat].comment;
    },
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

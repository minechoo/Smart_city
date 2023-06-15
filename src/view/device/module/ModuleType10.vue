<template lang="">
  <div class="content" id="dust">
    <div class="power flex_between mr_25">
      <h4 class="mr_25 li_55 mb_0">미세먼지 표출기 전원</h4>
      <div>
        <div class="power_line">
          <div class="on_green">
            <input
              type="radio"
              name="power"
              id="on_green"
              value="ON"
              v-model="power"
              @click="fnOnPowerChanged('ON')"
              checked
            />
            <label for="on_green">ON</label>
          </div>
          <div class="off_grey">
            <input
              type="radio"
              name="power"
              id="off_grey"
              value="OFF"
              v-model="power"
              @click="fnOnPowerChanged('OFF')"
            />
            <label for="off_grey">OFF</label>
          </div>
        </div>
      </div>
    </div>
    <div class="flex_center cl_both">
      <img src="@/style/images/img_dust.png" alt="" id="cctv_img" />
    </div>
    <div class="ab_a">
      <a href="https://www.airn.co.kr" class="a_link" target="_blank"
        >미세먼지 대기질 정보 보러가기</a
      >
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    power: "OFF",
    isMount: false,
    currentModule: {},
  }),
  props: { module: { type: Object } },
  computed: {
    ...mapGetters(["getUserInfo"]),
   
  },
  created() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.end || "2300";
    this.power = this.module.status;
  },
  mounted() {
    setTimeout(() => {
      this.isMount = true;
    }, 100);
  },
  methods: {
    ...mapActions(["commandOn", "commandOff", "commandCron"]),
    fnOnPowerChanged(status) {
      const command = {
        userId: this.getUserInfo.userId,
        deviceId: this.currentModule.deviceId,
        moduleId: this.currentModule.moduleId,
      };
      console.log(status);
      if (status === "ON") {
        this.commandOn(command);
      } else {
        this.commandOff(command);
      }
    },
  },
};
</script>
<style lang=""></style>

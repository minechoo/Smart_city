<template lang="">
  <div class="content flex_between pos_rel" id="sun">
    <div class="left_time flex_center_c">
      <img src="@/style/images/img_sun.png" alt="" id="cctv_img" />
    </div>
    <div class="right_content flex_center_s">
      <div class="value_box">
        <div class="value_inner">
          <p class="val_p">
            <span class="val">{{status.volt}}</span><span class="unit">V</span>
          </p>
          <p class="val_name">voltage</p>
        </div>
        <div class="value_inner">
          <p class="val_p">
            <span class="val">{{status.current}}</span><span class="unit">A</span>
          </p>
          <p class="val_name">current</p>
        </div>
        <div class="value_inner">
          <p class="val_p">
            <span class="val">{{status.power}}</span><span class="unit">W</span>
          </p>
          <p class="val_name">power</p>
        </div>
        <div class="value_inner">
          <p class="val_p">
            <span class="val">{{status.energy}}</span><span class="unit">Wh</span>
          </p>
          <p class="val_name">energy</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    power: "OFF",
    isMount: false,
    status : {
      volt :223,
      current :100,
      power : 23,
      energy :33

    },
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

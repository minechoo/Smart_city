<template lang="">
  <div class="content" id="bell">
    <div class="power">
      <h4>전원</h4>
      <div class="power_line">
        <div class="on_green">
          <input
            type="radio"
            name="power"
            id="on_green"
            value="ON"
            v-model="power"
            @click="fnOnPowerChanged('ON')"
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
    <div class="left_time flex_center mt_70">
      <img :src="getPowerStatusImg" alt="" id="bell_img" class="mt_42" />
      <div class="ab_caution bottom">비상벨 점검이 필요합니다.</div>
      <!-- <div class="wrap">
                
              </div> -->
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
    getPowerStatusImg: function () {
      const added = this.power === "ON" ? "img_bell_on" : "img_bell_off";
      return require(`@/style/images/${added}.png`);
    },
  },
  created() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.end || "2300";
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

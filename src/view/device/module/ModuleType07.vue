<template lang="">
  <div class="content" id="heat_box">
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
            @click="fnOnPowerChanged"
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
            @click="fnOnPowerChanged"
          />
          <label for="off_grey">OFF</label>
        </div>
      </div>
    </div>
    <div class="img_box">
      <img :src="getPowerStatusImg" alt="" id="heat" />
    </div>
    <div class="ab_info">온열의자 {{ power === 'ON' ? '작동중' :'정지중' }}</div>
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
      const added = this.power === "ON" ? "img_heat_on" : "img_heat_off";
      return require(`@/style/images/${added}.png`);
    },
  },
  created() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.start || "2300";
  },
  mounted() {
    setTimeout(() => {
      this.isMount = true;
    }, 100);
  },
  methods: {
    ...mapActions(["commandOn", "commandOff", "commandCron"]),
    fnOnPowerChanged() {
      const command = {
        userId: this.getUserInfo.userId,
        deviceId: this.currentModule.deviceId,
        moduleId: this.currentModule.moduleId,
      };

      if (this.power === "ON") {
        this.commandOn(command);
      } else {
        this.commandOff(command);
      }
    },
  },
};
</script>
<style lang=""></style>

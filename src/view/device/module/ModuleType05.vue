<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList :module="currentModule" @changeSchedule="fnChangeSchele">
      <div>
        <div class="power" id="inside">
          <h4>실내조명 전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                class="on_green"
                v-model="power"
                @click="fnOnPowerChanged('ON')"
                value="ON"
                checked
              />
              <label for="on_green">ON</label>
            </div>
            <div class="off_grey">
              <input
                type="radio"
                name="power"
                id="off_grey"
                v-model="power"
                @click="fnOnPowerChanged('OFF')"
                class="off_grey"
                value="OFF"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
        <div class="power mt_20" id="led">
          <h4>LED 조명 전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led"
                class="on_green"
                v-model="led"
                @click="fnOnLedChanged('ON')"
                value="ON"
              />
              <label for="on_green_led">ON</label>
            </div>
            <div class="off_grey">
              <input
                type="radio"
                name="power_led"
                id="off_grey_led"
                class="off_grey"
                v-model="led"
                @click="fnOnLedChanged('OFF')"
                value="OFF"
                checked
              />
              <label for="off_grey_led">OFF</label>
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

const defaultVal = {
  led: "COLD",
};
export default {
  data: () => ({
    power: "OFF",
    led: "OFF",
    isMount: false,
    currentModule: {},
  }),
  props: { module: { type: Object } },

  emits: ["changeSchedule"],
  components: { ModuleScedule, ModuleSceduleList },
  watch: {
    currentModule() {
      console.log("on changed");
      if (this.isMount) {
        this.fnSave();
      }
    },
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.end || "2300";
    this.power = this.module.status;
    this.led = this.module.led || defaultVal.led;

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
    fnOnLedChanged(status) {
      console.log("fnOnLedChanged changed!");
      const command = {
        userId: this.getUserInfo.userId,
        deviceId: this.currentModule.deviceId + 'LED',
        moduleId: this.currentModule.moduleId,
      };

      if (status === "ON") {
        this.commandOn(command);
      } else {
        this.commandOff(command);
      }
    },
    fnChangeSchele(start, end) {
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
      this.fnSave();
    },

    async fnSave() {
      const param = {
        ...this.currentModule,
        light: this.light,
        temp: this.temp,
        led: this.led,
        datFlag: "U",
      };
      console.log("call save : ", param);
      const { data } = await ComApi.post("/api/device/module/process", param);
      console.log(data);
    },
  },
};
</script>
<style lang=""></style>

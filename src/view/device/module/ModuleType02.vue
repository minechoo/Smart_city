<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList :module="currentModule" @changeSchedule="fnChangeSchele">
      <div>
        <div class="power_3col">
          <h4>전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                class="on_green"
                value="ON"
                @click="fnOnPowerChanged('ON')"
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
                @click="fnOnPowerChanged('OFF')"
                v-model="power"
                value="OFF"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
        <div class="power_3col mt_20">
          <h4>운전선택</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led"
                class="on_green"
                value="green"
                v-model="led"
              />
              <label for="on_green_led">냉방</label>
            </div>
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led_02"
                class="on_green"
                value="blue"
                v-model="led"
                checked
              />
              <label for="on_green_led_02">제습</label>
            </div>
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led_03"
                class="on_green"
                value="grey"
                v-model="led"
                checked
              />
              <label for="on_green_led_03">난방</label>
            </div>
          </div>
        </div>
        <div class="power_3col mt_20">
          <h4>희망온도</h4>
          <div class="power_line w_427">
            <div class="tem">
              희망온도
              <div>
                <span id="temperature">{{ temp }}</span
                >℃
              </div>
            </div>
            <button class="tem_btn" id="up" @click="() => temp++"></button>
            <button class="tem_btn" id="down" @click="() => temp--"></button>
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
  temp: 26,
  led: "COLD",
  light: "ON",
};
export default {
  data: () => ({
    temp: 24,
    light: "",
    power: "",
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
    light() {
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
    led() {
      if (this.isMount) {
        this.fnSave();
      }
    },
    temp() {
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
    this.temp = this.module.temp || defaultVal.temp;
    this.light = this.module.light || defaultVal.light;
    this.led = this.module.led || defaultVal.led;
    this.power = this.module.status;
    setTimeout(() => {
      this.isMount = true;
    }, 100);
  },
  methods: {

    ...mapActions(["commandOn", "commandOff" , "commandCron"]),

    fnChangeSchele(start, end) {
    
      this.currentModule.start = start;
      this.currentModule.end = end;
      const command = {
          userId: this.getUserInfo.userId,
          deviceId: this.currentModule.deviceId,
          moduleId: this.currentModule.moduleId,
          start , end
      };
      this.commandCron(command);
      this.fnSave();
    },
    fnOnPowerChanged(status) {
      const command = {
        userId: this.getUserInfo.userId,
        deviceId: this.currentModule.deviceId,
        moduleId: this.currentModule.moduleId,
      };
      
      if (status === "ON") {
        this.commandOn(command);
      } else {
        this.commandOff(command);
      }
    },
    fnAddTemp() {
      this.temp = this.temp + 1;
    },
    fnSubTemp() {
      this.temp = this.temp - 1;
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

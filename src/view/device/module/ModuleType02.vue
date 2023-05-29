<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList :module="currentModule" @changeSchedule="fnChangeSchele">
      <div>
        <div class="power_3col">
          <h4>실내조명 전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                class="on_green"
                value="ON"
                @changed="fnSave"
                v-model="light"
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
                @changed="fnSave"
                v-model="light"
                value="OFF"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
        <div class="power_3col mt_20">
          <h4>LED 라인조명 전원</h4>
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
            <button
              class="tem_btn"
              id="up"
              @click="() => temp++"
            ></button>
            <button
              class="tem_btn"
              id="down"
              @click="() => temp--"
            ></button>
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
const defaultVal = {
  temp: 26,
  led: "COLD",
  light: "ON",
};
export default {
  data: () => ({
    temp : 24,
    light: '',
    led : '',
    currentModule: {},
  }),
  props: { module: { type: Object } },

  emits: ["changeSchedule"],
  components: { ModuleScedule, ModuleSceduleList },
  watch: {
    currentModule() {
      console.log('on changed');
      this.fnSave();
    },
    module() {
      const { moduleId, moduleCd, moduleNm, deviceId } = this.module;
      const moduleInfo = { moduleNm, moduleCd, deviceId, moduleId };
      console.log(moduleInfo);
    },
  },
  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.start || "2300";
    this.currentModule.temp = this.module.temp || defaultVal.temp;
    this.currentModule.light = this.module.light || defaultVal.light;
    this.currentModule.led = this.module.led || defaultVal.led;
  },
  methods: {
    
    fnChangeSchele(start, end) {
      this.currentModule.start = start;
      this.currentModule.end = end;
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
      const { data } = await ComApi.post("/device/module/process", param);
      console.log(data);
    },
  },
};
</script>
<style lang=""></style>

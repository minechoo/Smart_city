<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList
      :module="currentModule"
      @changeSchedule="fnChangeSchele"
    >
    <div class="power">
        <h4 class="mr_25 li_55 mb_0">전원</h4>
        <div>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
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
                value="OFF"
                @click="fnOnPowerChanged('OFF')"
                v-model="power"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
      </div>
    </ModuleSceduleList>
  </div>
</template>
<script>
import ComApi from '@/service/ComApi';
import ModuleScedule from "@/components/device/module/ModuleScedule.vue";
import ModuleSceduleList from "@/components/device/module/ModuleSceduleList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    power : 'OFF',
    currentModule: {},
  }),
  emits: ['changeSchedule'],
  props: { module: { type: Object } },
  components: { ModuleScedule, ModuleSceduleList },
  watch: {
    module() {
      this.currentModule = {...this.module};
      this.currentModule.start = this.module.start || "0900";
      this.currentModule.end = this.module.end || "2300";
     
    },
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.end || "2300";
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
    async fnSave(){
      const param =  { ...this.currentModule , datFlag :'U'};
      console.log('call save : ' , param);
      const {data} = await ComApi.post('/api/device/module/process', param);
      console.log(data);
    }
  },
};
</script>
<style lang=""></style>

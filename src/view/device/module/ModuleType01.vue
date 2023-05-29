<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList
      :module="currentModule"
      @changeSchedule="fnChangeSchele"
    />
  </div>
</template>
<script>
import ComApi from '@/service/ComApi';
import ModuleScedule from "@/components/device/module/ModuleScedule.vue";
import ModuleSceduleList from "@/components/device/module/ModuleSceduleList.vue";
export default {
  data: () => ({
    currentModule: {},
  }),
  props: { module: { type: Object } },
  components: { ModuleScedule, ModuleSceduleList },
  watch: {
    module() {
    
      this.currentModule = {...this.module};
      this.currentModule.start = this.module.start || "0900";
      this.currentModule.end = this.module.end || "2300";
     
    },
  },
  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.end || "2300";
  },
  methods: {
    fnChangeSchele(start, end) {
      this.currentModule.start = start;
      this.currentModule.end = end;
      this.fnSave();
    },
    async fnSave(){
      const param =  { ...this.currentModule , datFlag :'U'};
      console.log('call save : ' , param);
      const {data} = await ComApi.post('/device/module/process', param);
      console.log(data);
    }
  },
};
</script>
<style lang=""></style>

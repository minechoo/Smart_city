<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="currentModule" />
    <ModuleSceduleList :module="currentModule" @changeSchedule="fnChangeSchele" />
  </div>
</template>
<script>
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
      const { moduleId, moduleCd, moduleNm, deviceId } = this.module;
      const moduleInfo = { moduleNm, moduleCd, deviceId, moduleId };
      console.log(moduleInfo);
    },
  },
  mounted() {
    this.currentModule = { ...this.module };
    this.currentModule.start = this.module.start || "0900";
    this.currentModule.end = this.module.start || "2300";
  },
  methods: {
    fnChangeSchele(start, end) {
      this.currentModule.start = start;
      this.currentModule.end = end;
    },
  },
};
</script>
<style lang=""></style>

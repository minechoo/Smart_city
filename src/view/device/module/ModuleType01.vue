<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="module" />
    <ModuleSceduleList :module="module"/>
  </div>
</template>
<script>
import ModuleScedule from "@/components/device/module/ModuleScedule.vue";
import ModuleSceduleList from "@/components/device/module/ModuleSceduleList.vue";
export default {
  props: { module: { type: Object } },
  components: { ModuleScedule ,ModuleSceduleList },
  watch: {
    module() {
      const { moduleId, moduleCd, moduleNm, deviceId } = this.module;
      const moduleInfo = { moduleNm, moduleCd, deviceId, moduleId };
      console.log(moduleInfo);
    },
  },
  mounted() {},
};
</script>
<style lang=""></style>

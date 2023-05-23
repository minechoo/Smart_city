<template>
  <main>
    <div class="stop_wrap">
      <BasicHeader />
      <router-view></router-view>
    </div>
  </main>
</template>
<script>
import BasicHeader from "./BasicHeader.vue";
export default {
  components: {
    BasicHeader,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <main>
    <div class="stop_wrap">
      <BasicHeader />
      <LeftMenu/>
      <router-view></router-view>
    </div>
  </main>
</template>
<script>
import BasicHeader from "./BasicHeader.vue";
import LeftMenu from "./left/LeftMenu.vue";
export default {
  components: {
    BasicHeader,
    LeftMenu
},
  data() {
    return {};
  },
};
</script>

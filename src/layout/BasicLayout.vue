<template>
  <main>
    <div class="stop_wrap">
     {{ areaId }} {{ deviceId }}
      <BasicHeader />
      <LeftMenu />
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
    return { };
  },
  computed: {

    areaId() {
      return this.$route.params.areaId;
    },

    deviceId() {
      return this.$route.params.deviceId;
    }
  }

};
</script>

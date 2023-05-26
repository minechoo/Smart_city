<template lang="">
  <ul class="tab_round">
    <li v-for="v in tabMenu" v-bind:key="v.id">
      <router-link :to="v.url" :class="getUrlClass(v.url)">{{
        v.name
      }}</router-link>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tabMenu: [
        { id: 1, url: "/device/shelter", name: "스마트 쉘터" },
        { id: 2, url: "/device/library", name: "스마트 도서관" },
        { id: 3, url: "/device/poll", name: "스마트 폴" },
        { id: 4, url: "/device/station", name: "스마트 정류장" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getDeviceList"]),
  },
  mounted() {
    console.log(this.getDeviceList);
    const convertedList = this.getDeviceList.reduce((prev, curr) => {
      const type = curr.deviceType;

      if (prev.filter((v) => v.deviceType === type).length === 0) {
        prev.push(curr);
      }
      return prev;
    }, []);

    const tabMenu = convertedList.map((v, idx) => {
      const tab = {
        id: idx,
        url: `/device/${v.deviceType.toLowerCase()}/${v.deviceId}`,
        name: v.deviceType,
      };
      return tab;
    });
    this.tabMenu = tabMenu;
  },
  methods: {
    getUrlClass(url) {
      return { "router-link-active": this.$route.fullPath.indexOf(url) === 0 };
    },
  },
};
</script>

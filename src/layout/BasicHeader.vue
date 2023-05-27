<template lang="">
  <ul class="tab_round">
    <li v-for="v in tabMenu" v-bind:key="v.id">
      <router-link :to="v.url" :class="getUrlClass(v.type)">{{
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
      const type = curr.deviceCd;

      if (prev.filter((v) => v.deviceCd === type).length === 0) {
        prev.push(curr);
      }
      return prev;
    }, []);

    const tabMenu = convertedList.map((v, idx) => {
      const tab = {
        id: idx,
        url: `/device/${v.deviceCd.toLowerCase()}/${v.deviceId}`,
        name: v.deviceCd,
        type: v.deviceCd.toLowerCase()
      };
      return tab;
    });
    this.tabMenu = tabMenu;
  },
  methods: {
    getUrlClass(type) {
      return { "router-link-active": this.$route.params.deviceCd === type };
    },
  },
};
</script>

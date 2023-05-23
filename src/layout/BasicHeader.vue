<template lang="">
  <ul class="tab_round">
    <li v-for="v in tabMenu" v-bind:key="v.id">
      <router-link :to="v.url">{{ v.name }}</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      tabMenu: [
        { id: 1, url: "/device/shelter", name: "스마트 쉘터" },
        { id: 2, url: "/device/library", name: "스마트 도서관" },
        { id: 3, url: "/device/poll", name: "스마트 폴" },
        { id: 4, url: "/device/stop", name: "스마트 정류장" },
      ],
    };
  },
};
</script>

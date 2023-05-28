<template>
  <div class="ab_membership">
    <header class="header">
      <h1>아이디·비밀번호 찾기</h1>
    </header>
    <div class="tabs">
      <ul>
        <li
          :class="{ tab: true, on: selectedTab === 'ID' }"
          aria-selected="true"
          aria-controls="tab-1"
          @click="() => setSelectedTag('ID')"
        >
          아이디 찾기
        </li>
        <li
          :class="{ tab: true, on: selectedTab === 'PASSWORD' }"
          aria-selected="false"
          aria-controls="tab-2"
          @click="() => setSelectedTag('PASSWORD')"
        >
          비밀번호 찾기
        </li>
      </ul>
      <FindID v-if="selectedTab === 'ID'" @onCloseDialog="fnClose" />
      <FindPwd v-if="selectedTab === 'PASSWORD'" @onCloseDialog="fnClose" />
    </div>
  </div>
</template>
<script>
import FindID from "./FindId.vue";
import FindPwd from "./FindPwd.vue";
export default {
  components: {
    FindID,
    FindPwd,
  },
  data() {
    return {
      selectedTab: "ID"
    };
  },
  mounted(){
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        this.fnClose();
      }
    });
  },
  methods: {
    setSearched() {
      this.searched = true;
    },
    setSelectedTag(tagId) {
      this.selectedTab = tagId;
    },
    fnClose() {
      console.log("click btn");
      this.$emit("onCloseDialog");
    },
  },
};
</script>

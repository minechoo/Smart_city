<template>
  <header>
    <h1><a @click="goMain">스마트 시설물 통합 운영 관리 시스템</a></h1>
    <div class="right_section">
      <div class="logo">[{{ getUserInfo.deptNm }}]</div>
      <div class="info" @click="fnShowMyPage">내정보 변경</div>
      <div class="login" @click="fnLogout">로그아웃</div>
    </div>
  </header>

  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
  <!--  -->

  <Transition>
    <div v-if="showDialog" class="dialog-dim">
      <UserInfo @onClose="fnHideMyPage" />
    </div>
  </Transition>
</template>
<script>
import UserInfo from "@/view/login/UserInfo.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { UserInfo },

  data() {
    return {
      showDialog: false,
    };
  },
  created() {
      console.log('>>>>>>', this.isLogin);
      if(this.isLogin === true){
          // todo go main!!!
          this.goMain();
      }else{
         this.doLogout();
      }
  },
  computed: {
    ...mapGetters(["isLogin", "getUserInfo"]),
  },
  watch: {
    isLogin() {},
  },
  methods: {
    ...mapActions(["doLogin", "doLogout"]),

    fnShowMyPage() {
      this.showDialog = true;
    },
    fnHideMyPage() {
      this.showDialog = false;
    },
    fnLogout() {
      this.doLogout();
      this.$router.push("/");
    },
    goMain() {
      this.$router.push("/dash");
    },
  },
};
</script>

<style>
.dialog-dim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>

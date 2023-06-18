<template>
  <div>
    <LoginPage v-if="!isLogin" />
    <MainPage v-if="isLogin" />
    <Transition>
      <ComMessage></ComMessage>
    </Transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LoginPage from "./view/login/LoginPage.vue";
import MainPage from "./view/MainPage.vue";

export default {
  name: "App",
  components: {
    LoginPage,
    MainPage,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  watch: {
    // 로그인 상태 변화에 따른 페이지 이동 처리 
    isLogin() {
      if (this.isLogin) {
        Promise.all([this.getCodeList()]).then(
          this.$router.push("/dash")
        );
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions(["doLogin", "doLogout", "getCodeList"]),
    fnLogout() {
      this.$store.dispatch("showConfirm", {
        msg: "Logout?",
        cb: (rtn) => {
          if (rtn) {
            this.doLogout();
          }
        },
      });
    },
    fnAddMessage() {
      this.$store.dispatch("showAlert", { msg: "Server is Error" });
    },
    fnAddWarning() {
      this.$store.dispatch("showWarning", { msg: "name is mandantory" });
    },
    async fnLogin() {
      this.doLogin({ userId: "chu", password: "1234" });
    },
  },
};
</script>

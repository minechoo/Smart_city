<template lang="">
  <div class="tab-panel" style="display: block">
    <div class="input_box bd_none h_339">
      <div class="flex_column">
        <div class="input_area w_100">
          <label for="">아이디(이메일)</label>
          <input
            type="text"
            class="input_style"
            v-model="userId"
            :disabled="this.searched"
            placeholder="ex) abc@def.co.kr"
          />
        </div>
        <div class="input_area w_100">
          <label for="">연락처</label>
          <input
            type="text"
            class="input_style"
            v-model="telNo"
            :disabled="this.searched"
            placeholder="연락처를 입력하세요"
          />
        </div>
      </div>
      <div class="info" v-if="!searched">
        <img src="@/style/images/system.png" alt="" />
        <span>스마트 시설물 통합 운영 관리 시스템</span>
      </div>

      <div class="flex_column">
        
      </div>
      <!-- 왼쪽 패널 입력하면 뜨는 섹션 -->
    </div>

    <div class="btn_area">
      <button class="btn grey_line mr_17" @click="fnCancel">취소하기</button>
      <button class="btn bg_green" v-if="!searched" @click="fnSearch">
        비밀번호 찾기
      </button>
    
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    searched: false,
    userId: "",
    telNo: "",
    userPwd: "",
    userPwdRe: "",
    searchRtn: {},
  }),
  methods: {
    fnCancel() {
    
      this.$emit("onCloseDialog");
    },
    async fnSearch() {
      const param = { userId: this.userId, telNo: this.telNo };
      const { data } = await this.$axios.post("/api/user/findMe", param);
      this.searchRtn = data;

      if (this.searchRtn.userId) {
        this.searched = true;
        const rtnCode = await this.fnSendPassword();
        console.log(rtnCode);

        if(rtnCode === '200'){
          this.$store.dispatch("showAlert", {
          msg: "이메일을 확인해주세요. ",
          cb: this.fnCancel,
        });
        }
      } else {
        this.searched = false;
      }
    },
    async fnSendPassword() {
      const param = { userId: this.userId };
      const { data } = await this.$axios.post("/api/user/findPassword", param);
      console.log(data) ;
      return data.code;
    },
    async fnSignUp() {
      if (!this.userPwd || this.userPwd !== this.userPwdRe) {
        this.$store.dispatch("showAlert", {
          msg: "비밀번호가 일치하지 않습니다. ",
          cb: ()=>{},
        });
        return ;
      }

      const param = { ...this.searchRtn, userPwd: this.userPwd };
      console.log("newMessage", param);
      const { data } = await this.$axios.post("/api/user/modify", param);

      if (data.code === "200") {
        this.$store.dispatch("showAlert", {
          msg: "저장이 완료 되었습니다.",
          cb: this.fnCancel,
        });
      }
    },
  },
};
</script>
<style lang=""></style>

<template>
  <div class="ab_membership">
    <div class="header">
      <h1>회원가입</h1>
      <p>스마트 시설물 통합 운영 관리 시스템에 오신것을 환영합니다.</p>
    </div>
    <div class="input_box">
      <div class="input_area">
        <label for="id_e">아이디(이메일)</label>
        <input
          type="text"
          id="id_e"
          class="input_style"
          placeholder="ex) abc@def.co.kr"
          v-model="userInfo.userId"
        />
      </div>
      <div class="input_area">
        <label for="company">업체명 또는 이름</label>
        <input
          type="text"
          id="company"
          class="input_style"
          placeholder="업체명 또는 이름을 입력하세요"
          v-model="userInfo.deptNm"
        />
      </div>
      <div class="input_area">
        <label for="pw">비밀번호</label>
        <input
          type="password"
          id="pw"
          class="input_style"
          placeholder="비밀번호를 입력하세요"
          v-model="userInfo.userPwd"
        />
      </div>
      <div class="input_area">
        <label for="pw_c">비밀번호 확인</label>
        <input
          type="password"
          id="pw_c"
          class="input_style"
          placeholder="비밀번호를 확인해주세요"
          v-model="userInfo.userPwdRe"
        />
      </div>
      <div class="input_area">
        <label for="phone">연락처</label>
        <input
          type="text"
          id="phone"
          class="input_style"
          placeholder="연락처를 입력하세요"
          v-model="userInfo.telNo"
        />
      </div>
    </div>
    <div class="btn_area">
      <button class="btn grey_line mr_17" @click="fnClose">
        취소하기
      </button>
      <button class="btn bg_grren" @click="fnSignUp">회원가입</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        userId: "",
        userPwd: "",
        userPwdRe: "",
        deptNm: "",
        telNo: "",
      },
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
    fnClose() {
      console.log("click btn");
      this.$emit("onClose");
    },
    async fnSignUp() {
      const param = { ...this.userInfo };
      const { data } = await this.$axios.post("/api/user/signUp", param);
      console.log(data);
      this.fnClose();
    },
  },
};
</script>
<style></style>

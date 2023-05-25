<template>
  <div class="ab_membership">
    <div class="header">
      <h1>내 정보 변경</h1>
      <p>스마트 시설물 통합 운영 관리 시스템에 오신것을 환영합니다.</p>
    </div>
    <div class="input_box">
      <div class="input_area">
        <label for="id_e">아이디(이메일)</label>
        <input
          type="text"
          id="id_e"
          class="input_style"
          v-model="userInfo.userId"
          disabled
          placeholder="ex) abc@def.co.kr"
        />
      </div>
      <div class="input_area">
        <label for="company">업체명 또는 이름</label>
        <input
          type="text"
          id="company"
          class="input_style"
          v-model="userInfo.deptNm"
          placeholder="업체명 또는 이름을 입력하세요"
        />
      </div>
      <div class="input_area">
        <label for="pw">비밀번호</label>
        <input
          type="text"
          id="pw"
          v-model="userInfo.userPwd"
          class="input_style"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div class="input_area">
        <label for="pw_c">비밀번호 확인</label>
        <input
          type="text"
          id="pw_c"
          v-model="userInfo.userPwdRe"
          class="input_style"
          placeholder="비밀번호를 확인해주세요"
        />
      </div>
      <div class="input_area">
        <label for="phone">연락처</label>
        <input
          type="text"
          id="phone"
          class="input_style"
          v-model="userInfo.telNo"
          placeholder="연락처를 입력하세요"
        />
      </div>
    </div>
    <div class="btn_area">
      <button class="btn grey_line mr_17" @click="$emit('onClose')">
        취소하기
      </button>
      <button class="btn bg_grren" @click="fnSaveUserInfo">변경하기</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    userInfo: { userId: "", userPwd: "", userPwdRe: "", telNo: "", deptNm: "" },
  }),
  watch: {},
  mounted() {
    const savedUserInfo = { ...this.getUserInfo };
    this.userInfo = savedUserInfo;
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    fnCancel() {
      this.$emit("onClose");
    },
    

    async fnSaveUserInfo() {
      const param = { ...this.userInfo };
      const { data } = await this.$axios.post("/user/modify", param);
      console.log(data);

      this.$store.dispatch("showAlert", {
        msg: "저장되었습니다. ",
        cb: this.fnCancel,
      });
    },
  },
};
</script>
<style></style>

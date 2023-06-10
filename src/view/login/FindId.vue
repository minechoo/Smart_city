<template lang="">
  <div class="tab-panel" style="display: block">
    <div class="input_box bd_none h_33">
      <div class="flex_column">
        <div class="input_area w_100">
          <label for="">업체명 또는 이름</label>
          <input
            type="text"
            v-model="deptNm"
            class="input_style"
            placeholder="업체명 또는 이름을 입력하세요"
          />
        </div>
        <div class="input_area w_100">
          <label for="">연락처</label>
          <input
            type="text"
            v-model="telNo"
            class="input_style"
 
            placeholder="연락처를 입력하세요"
          />
        </div>
        <transition>
          <p v-if="searchRtn.userId" v-html="getResultMsg" />
        </transition>
      </div>
      <div class="info">
        <img src="@/style/images/system.png" alt="" />
        <span>스마트 시설물 통합 운영 관리 시스템</span>
      </div>
    </div>
    <div class="btn_area">
      <button class="btn grey_line mr_17" @click="fnCancel">취소하기</button>
      <button class="btn bg_green" @click="fnSearch">아이디찾기</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { deptNm: "", telNo: "", searchRtn: {} };
  },
  computed: {
    getResultMsg() {
      return `[${this.searchRtn.deptNm}]님의 아이디는 <span>${this.searchRtn.userId}</span> 입니다.`;
    },
  },
  methods: {
    async fnSearch() {
      const param = { deptNm: this.deptNm, telNo: this.telNo };
      const { data } = await this.$axios.post("/api/user/findMe", param);
      this.searchRtn = data;
    },
    fnCancel() {
      console.log("click btn");
      this.$emit("onCloseDialog");
    },
  },
};
</script>
<style lang=""></style>

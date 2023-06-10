<template lang="">
  <div class="btnArea set_del">
    <header class="header p_none">
      <h1>등록기기 설정</h1>
      <button class="btn_close" @click="fnClose"></button>
    </header>
    <div class="write">
      <label for="set_name">등록기기 이름 바꾸기</label>
      <input
        type="text"
        id="set_name"
        placeholder="ex) ㅇㅇ룸 에어컨"
        v-model="currentModule.moduleNm"
      />
    </div>
    <div class="write">
      <label for="set_name">모듈번호</label>
      <input
        type="text"
        id="set_name"
        placeholder="모듈번호를 입력하세요"
        v-model="currentModule.moduleNo"
      />
    </div>
    <div class="btn_area btn_a_02">
      <!-- <button class="btn grey_line mr_17">삭제하기</button> -->
      <button class="btn btn_green" @click="fnSave">설정하기</button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({ currentModule: {} }),
  props: { module: { type: Object } },
  created() {
    this.currentModule = { ...this.module };
  },
  methods: {
    fnClose() {
      this.$emit("onClose");
    },
    async fnSave() {
      console.log('call on save fn ');
      const param = { ...this.currentModule, datFlag: "U" };
      const { data } = await this.$axios.post(
        "/api/device/module/process",
        param
      );
      console.log(data);

      this.fnClose();
    },
  },
};
</script>
<style lang=""></style>

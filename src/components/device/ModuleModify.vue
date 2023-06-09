<template lang="">
  <div class="set_del">
    <header class="header p_none">
      <h1>등록기기 설정</h1>
      <button class="btn_close"></button>
    </header>
    <div class="write">
      <label for="set_name">등록기기 이름 바꾸기</label>
      <input type="text" id="set_name" placeholder="ex) ㅇㅇ룸 에어컨" />
    </div>
    <div class="btn_area btn_a_02">
      <!-- <button class="btn grey_line mr_17">삭제하기</button> -->
      <button class="btn btn_green">설정하기</button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  props: { module: { type: Object } },
};
</script>
<style lang=""></style>

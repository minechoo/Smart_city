<template lang="">
  <div class="content" id="electric">
    <div class="power">
      <h4>전원</h4>
      <div class="power_line">
        <div class="on_green">
          <input
            type="radio"
            name="power"
            id="on_green"
            value="green"
            checked
          />
          <label for="on_green">ON</label>
        </div>
        <div class="off_grey">
          <input type="radio" name="power" id="off_grey" value="grey" />
          <label for="off_grey">OFF</label>
        </div>
      </div>
    </div>
    <div class="img_box mt_250">
      <img src="@/style/images/img_electric_on.png" alt="" id="el" />
    </div>
    <div class="ab_info">전동어닝이 펼쳐집니다.</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

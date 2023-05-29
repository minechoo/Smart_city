<template lang="">
  <div class="content" id="heat_box">
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
    <div class="img_box">
      <img src="@/style/images/img_heat_on.png" alt="" id="heat" />
    </div>
    <div class="ab_info">온열의자 작동중</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

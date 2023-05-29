<template lang="">
  <div class="content" id="bell">
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
    <div class="left_time flex_center mt_70">
      <img src="@/style/images/img_bell_off.png" alt="" id="bell_img" class="mt_42" />
      <div class="ab_caution bottom">비상벨 점검이 필요합니다.</div>
      <!-- <div class="wrap">
                
              </div> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

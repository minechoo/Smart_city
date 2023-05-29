<template lang="">
  <div class="content" id="dust">
    <div class="power flex_between mr_25">
      <h4 class="mr_25 li_55 mb_0">미세먼지 표출기 전원</h4>
      <div>
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
    </div>
    <div class="flex_center cl_both">
      <img src="@/style/images/img_dust.png" alt="" id="cctv_img" />
    </div>
    <div class="ab_a">
      <a href="https://www.airn.co.kr/stations"
        >미세먼지 대기질 정보 보러가기</a
      >
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

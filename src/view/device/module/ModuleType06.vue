<template lang="">
  <div class="content" id="cctv">
            <div class="power_wrap">
              <div class="wrap">
                <h4 class="mr_25 li_55 mb_0">통신</h4>
                <div class="ab_caution mr_50">
                  CCTV 점검필요
                </div>
              </div>
              <div class="power flex_between mr_25">
                <h4 class="mr_25 li_55 mb_0">미세먼지 표출기 전원</h4>
                <div>
                  <div class="power_line">
                    <div class="on_green">
                      <input type="radio" name="power" id="on_green" value="green" checked />
                      <label for="on_green">ON</label>
                    </div>
                    <div class="off_grey">
                      <input type="radio" name="power" id="off_grey" value="grey" />
                      <label for="off_grey">OFF</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cctv_wrap">
              <img src="@/style/images/img_cctv_on.png" alt="" id="cctv_img" class="mt_70">
            </div>
          </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

<template lang="">
 <div class="content" id="purify">

<div class="left_time">
  <svg class="svg">
    <circle cx="300" cy="275" r="170" class="circle"></circle>
  </svg>
  <svg class="svg_02">
    <circle cx="300" cy="275" r="170" class="circle_green"></circle>
  </svg>
  <div class="circle_inner">
    <p>06:00 ~ 22:00</p>
  </div>
  <span class="time q_0">0</span>
  <span class="time q_6">6</span>
  <span class="time q_12">12</span>
  <span class="time q_18">18</span>
  <span class="time q_end">22</span>
</div>

<div class="right_content">

  <div>
    <div class="power" id="inside">
      <h4>실내조명 전원</h4>
      <div class="power_line">
        <div class="on_green">
          <input type="radio" name="power" id="on_green" class="on_green" value="green" checked />
          <label for="on_green">ON</label>
        </div>
        <div class="off_grey">
          <input type="radio" name="power" id="off_grey" class="off_grey" value="grey" />
          <label for="off_grey">OFF</label>
        </div>
      </div>
    </div>
    <div class="power mt_20" id="led">
      <h4>LED 조명 전원</h4>
      <div class="power_line">
        <div class="on_green">
          <input type="radio" name="power_led" id="on_green_led" class="on_green" value="green" />
          <label for="on_green_led">ON</label>
        </div>
        <div class="off_grey">
          <input type="radio" name="power_led" id="off_grey_led" class="off_grey" value="grey" checked />
          <label for="off_grey_led">OFF</label>
        </div>
      </div>
    </div>
  </div>

  <div class="setting">
    <h4>간편 예약시간 설정</h4>
    <ul class="setting_list">
      <li class="on">
        <span class="square"></span>
        06:00 ~ 22:00
        <img src="@/style/images/ico_setting.png" alt="" id="settingTime">
      </li>
      <li>
        <span class="square"></span>
        08:00 ~ 22:00
        <span class="space"></span>
      </li>
      <li>
        <span class="square"></span>
        06:00 ~ 24:00
        <span class="space"></span>
      </li>
    </ul>
  </div>
</div>
</div>
</template>
<script>
export default {};
</script>
<style lang=""></style>

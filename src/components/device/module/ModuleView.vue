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
      <div class="setting">
        <h4>간편 예약시간 설정</h4>
        <ul class="setting_list">
          <li class="on">
            <span class="square"></span>
            06:00 ~ 22:00
            <img src="images/ico_setting.png" alt="" id="settingTime" />
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

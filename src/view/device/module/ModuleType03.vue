<template lang="">
  <div class="content" id="purify">
    <ModuleScedule :module="module" />
    <div class="right_content">
      <div>
        <div class="power_3col">
          <h4>실내조명 전원</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                class="on_green"
                value="green"
                checked
              />
              <label for="on_green">ON</label>
            </div>
            <div class="off_grey">
              <input
                type="radio"
                name="power"
                id="off_grey"
                class="off_grey"
                value="grey"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
        <div class="power_3col mt_20">
          <h4>운전선택</h4>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led"
                class="on_green"
                value="green"
              />
              <label for="on_green_led">AUTO</label>
            </div>
            <div class="on_green">
              <input
                type="radio"
                name="power_led"
                id="on_green_led_02"
                class="on_green"
                value="grey"
                checked
              />
              <label for="on_green_led_02">ION</label>
            </div>
          </div>
        </div>
        <div class="power_3col mt_20">
          <h4>대기질</h4>
          <div class="power_line w_427">
            <dl class="quality">
              <dt>상태</dt>
              <dd class="bar c_01"><span>좋음</span></dd>
              <dd class="bar c_02 on"><span>보통</span></dd>
              <dd class="bar c_03"><span>나쁨</span></dd>
              <dd class="bar c_04"><span>매우나쁨</span></dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="setting">
        <h4>간편 예약시간 설정</h4>
        <ul class="setting_list">
          <li class="on">
            <span class="square"></span>
            06:00 ~ 22:00
            <img src="@/style/images/ico_setting.png" alt="" id="settingTime" />
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
import ModuleScedule from "@/components/device/module/ModuleScedule.vue";
export default {
  components: { ModuleScedule },
};
</script>
<style lang=""></style>

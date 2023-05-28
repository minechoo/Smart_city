<template lang="">
  <div class="stop_wrap">
    <div class="menu_box">
     
      <header class="group">
          <h2>{{ deviceNm }}</h2>
          <button class="btn_close" @click="fnClose"></button> 
        </header>

      <div class="sub_wrap">
        <nav>
          <ul>
            <li class="on" v-for="v in list" v-bind:key="v.moduleId">
              <a href="#">{{ v.moduleNm }}</a>
            </li>
          </ul>
          <button class="arrow"></button>
        </nav>
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
                  <img
                    src="@/style/images/ico_setting.png"
                    alt=""
                    id="settingTime"
                  />
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ComApi from "@/service/ComApi";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  watch: {},
  mounted() {
    this.fnSearchModuleList();

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.fnClose();
      }
    });
  },
  computed: {
    deviceId() {
      return this.$route.params.deviceId;
    },
    deviceNm() {
      const deviceInfo = this.getDeviceList.find(
        (v) => v.deviceId === this.deviceId
      );
      return deviceInfo.deviceNm;
    },
    ...mapGetters(["getDeviceList"]),
  },

  methods: {
    fnClose() {
      this.$emit("onClose");
    },
    async fnSearchModuleList() {
      const { data } = await ComApi.post("/device/module/list", {
        deviceId: this.$route.params.deviceId,
      });
      this.list = data;
    },
    fnAddClosed() {},
  },
};
</script>
<style scoped>
.wid_70vw {
  width: 70vw;
  padding: 20px;
}
</style>

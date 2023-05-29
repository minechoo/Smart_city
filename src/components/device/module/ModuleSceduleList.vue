<template lang="">
  <div class="dialog-dim" v-if="isShowDialog">
    <div class="login_box bg_white radius_15">
      <h5>간편 예약시간 설정</h5>
      <button @click="fnHideDialog">X</button>
      <input
        type="text"
        placeholder="시작시간"
        id="start"
        v-model="popup.start"
        class="input_login"
      />
      <label for="start" class="offscreen">시작시간</label>
      <input
        type="text"
        placeholder="종료시간"
        id="end"
        class="input_login"
        v-model="popup.end"
      />
      <label for="end" class="offscreen">종료시간</label>

      <button type="submit" class="btn_login bg_green" @click="fnSaveSchedule">
        저장
      </button>
    </div>
  </div>
  <div class="right_content">
    <div class="setting">
      <div>
        <h4>간편 예약시간 설정</h4>
        <button @click="fnShowDialog">+</button>
      </div>
      <ul class="setting_list">
        <li
          :class="{ on: v.useYn === 'Y' }"
          v-for="(v, idx) in list"
          v-bind:key="idx"
        >
          <span class="square" @click="() => fnChangeSchele(idx)"></span>
          {{ v.start }} ~ {{ v.end }}
          <img src="@/style/images/ico_setting.png" alt="" id="settingTime" />
        </li>
        <!-- <li>
          <span class="square"></span>
          08:00 ~ 22:00
          <span class="space"></span>
        </li>
        <li>
          <span class="square"></span>
          06:00 ~ 24:00
          <span class="space"></span>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    list: [
      { start: "0000", end: "0000", useYn: "Y" },
      { start: "0600", end: "0800", useYn: "N" },
      { start: "0800", end: "1900", useYn: "N" },
    ],
    popup: {
      start: "0000",
      end: "0000",
    },
    isShowDialog: false,
    datFlag: "I",
  }),
  props: {
    module: { type: Object },
  },
  watch: {},
  mounted() {},
  computed: {},
  methods: {
    fnShowDialog() {
      this.datFlag = "I";
      this.isShowDialog = true;
    },
    fnHideDialog() {
      this.isShowDialog = false;
    },
    fnChangeSchele(pIdx) {
      const rtnList = this.list.map((v, idx) => {
        v.useYn = idx === pIdx ? "Y" : "N";
        return v;
      });

      this.list = rtnList;
    },
    fnSaveSchedule() {
      this.isShowDialog = false;
      const param = { ...this.popup, useYn: "N" };
      this.list.push(param);
    },
  },
};
</script>
<style scoped>
input {
  z-index: 1;
}
</style>

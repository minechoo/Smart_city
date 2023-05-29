<template lang="">
  <div class="login_box bg_white radius_15 mt_0">
    <header class="p_none h_auto">
      <h5 class="mb_0">간편 예약시간 설정</h5>
      <button class="time_dialog_close" @click="fnHideDialog"></button>
    </header>
    <div class="pop_area">
      <HourSelect
        title="시작시간"
        :hour="start.hour"
        @updateHour="(val) => (start.hour = val)"
      />
      <div>
        <label for="m_start">분</label>
        <select name="" id="m_start" class="pop_sel" v-model="start.mm">
          <option value="00">00</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
    <div class="flex_between">
      <HourSelect
        title="시작시간"
        :hour="end.hour"
        @updateHour="(val) => (end.hour = val)"
      />
      <div>
        <label for="m_end">분</label>
        <select name="" id="m_end" class="pop_sel" v-model="end.mm">
          <option value="00">00</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn_login bg_green mb_0 mt_20" @click="fnSave">
      저장
    </button>
  </div>
</template>
<script>
import HourSelect from "@/components/ui/HourSelect.vue";
export default {
  components: { HourSelect },
  data: () => ({
    start: {
      hour: "00",
      mm: "00",
    },
    end: {
      hour: "00",
      mm: "00",
    },
  }),
  props: { datFlag: { type: String }, targetObj: { type: Object } },
  mounted() {
    if (this.targetObj) {
  
      const { start, end } = this.targetObj;
      this.start.hour = start.substring(0, 2);
      this.start.mm = start.substring(2, 4);
      this.end.hour = end.substring(0, 2);
      this.end.mm = end.substring(2, 4);
    }
  },
  methods: {
    fnHideDialog() {
      this.$emit("onClose");
    },
    fnSave() {
      const param = {
        ...this.targetObj,
        start: this.start.hour + this.start.mm,
        end: this.end.hour + this.end.mm,
        datFlag: this.datFlag,
      };

      this.$emit("onSave", param);
    },
  },
};
</script>
<style scoped>
.time_dialog_close {
  position: relative;
  top: -32px;
  right: -43px;
  width: 15px !important;
  height: 15px !important;
  background: url("@/style/images/btn_close.png") no-repeat center;
  background-size: 100% 100%;
  border: none;
  z-index: 1;
}
</style>

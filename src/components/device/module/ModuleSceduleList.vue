<template lang="">
  <div class="dialog-dim" v-if="isShowDialog">
    <ScheduleAdd
      @onClose="fnHideDialog"
      :datFlag="datFlag"
      :targetObj="targetObj"
      @onSave="fnSaveSchedule"
    />
  </div>
  <div class="right_content">
    <slot></slot>
    <div class="setting">
      <div class="flex">
        <h4 class="mr_10">간편 예약시간 설정</h4>
        <button class="btn_add_time" @click="() => fnShowDialog()"></button>
      </div>
      <ul class="setting_list">
        <li
          :class="{ on: v.useYn === 'Y' }"
          v-for="(v, idx) in list"
          v-bind:key="idx"
        >
          <span class="square" @click="() => fnChangeSchele(idx)"></span>
          {{ v.start.replace(/^(\d{2})(\d{2})$/, "$1:$2") }} ~
          {{ v.end.replace(/^(\d{2})(\d{2})$/, "$1:$2") }}
          <img
            src="@/style/images/ico_setting.png"
            alt=""
            id="settingTime"
            @click="() => fnShowDialogModify(idx)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ScheduleAdd from "@/components/device/module/SheduleAdd.vue";
import ComApi from "@/service/ComApi";
export default {
  components: { ScheduleAdd },
  data: () => ({
    list: [],
    popup: {
      start: { hour: "00", minute: "00" },
      end: { hour: "00", minute: "00" },
    },
    targetObj: null,
    isShowDialog: false,
    datFlag: "I",
  }),
  props: {
    module: { type: Object, default: () => ({ start: "0000", end: "2300" }) },
  },
  emits: ["changeSchedule"],
  watch: {
    module() {
      if (this.module) {
        this.list = this.list.map((v) => {
          console.log(
            v.start === this.module.start && v.end === this.module.end
          );
          if (v.start === this.module.start && v.end === this.module.end) {
            v.useYn = "Y";
          } else {
            v.useYn = "N";
          }
          return v;
        });
      }
    },
  },
  mounted() {
    console.log("hit scheduleList", this.module.moduleId);
    console.log(this.list);
    this.fnSearchSchedule();
  },
  computed: {},
  methods: {
    async fnSearchSchedule() {
      const { data } = await ComApi.post("/api/schedule/list", {});

      this.list = data.map((v) => {
        if (v.start === this.module.start && v.end === this.module.end) {
          v.useYn = "Y";
        } else {
          v.useYn = "N";
        }
        return v;
      });
    },
    fnShowDialog() {
      this.datFlag = "I";
      this.isShowDialog = true;
    },
    fnHideDialog() {
      this.isShowDialog = false;
    },
    fnShowDialogModify(idx) {
      this.datFlag = "U";
      this.isShowDialog = true;
      const selectedObj = { ...this.list[idx], idx };
      console.log(selectedObj);
      this.targetObj = selectedObj;
    },
    fnChangeSchele(pIdx) {
      const rtnList = this.list.map((v, idx) => {
        v.useYn = idx === pIdx ? "Y" : "N";
        return v;
      });

      this.list = rtnList;
      const { start, end } = this.list.find((v) => v.useYn === "Y");
      this.$emit("changeSchedule", start, end);
    },
    async fnSaveSchedule(payLoad) {
      console.log(payLoad);
      this.isShowDialog = false;

      const param = { ...payLoad, useYn: "N" , datFlag : this.datFlag  };

      const { data } = await ComApi.post("/api/schedule/process", param);
      console.log(data);
      this.fnSearchSchedule();
      if (payLoad.useYn === "Y") {
        this.$emit("changeSchedule", payLoad.start, payLoad.end);
      }
    },
  },
};
</script>
<style scoped>
input {
  z-index: 1;
}
</style>

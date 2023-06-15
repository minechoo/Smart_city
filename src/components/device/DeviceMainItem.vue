<template lang="">
  <div :class="{ go: true, caution: !stat }">
    <div class="flex_col">
      <a href="#">
        <div class="operation">
          <span class="status"></span>
          <span class="sign">{{ statNm }}</span>
        </div>
        <img
          :src="icoUrl"
          :alt="name"
          class="svg_color"
          @click="$emit('showDetails', moduleId)"
        />
        <h2>{{ name }}</h2>
      </a>
    </div>
    <div class="flex_col_bet">
      <div class="flex">
        <img
          src="@/style/images/svg/ico_menu_top.svg"
          alt="버튼"
          @click="showModifyDialog"
          class="svg_top"
        />
        <img
          src="@/style/images/svg/ico_menu_delete.svg"
          alt="버튼"
          @click="showDeleteDialog"
          class="svg_delete"
        />
      </div>
      <p v-if="stat && start+end !== '00000000'">자동설정<br />{{ start }}- {{ end }}</p>
      <div>
        <img
          src="@/style/images/svg/ico_menu_bottom.svg"
          alt="버튼"
          class="svg_bottom"
        />
      </div>
    </div>
 
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ComApi from "@/service/ComApi";

export default {

  props: {
    moduleId: { type: String },
    deviceId: { type: String },
    stat: { type: Boolean },
    name: { type: String },
    type: { type: String },
    start: { type: String },
    end: { type: String },
  },
  computed: {
    statNm: function () {
      return this.stat === 'ON' ? "정상작동" : "점검필요";
    },
    icoUrl: function () {
    
      const currTypes = this.type.split("_")[1];
      return require(`@/style/images/svg/ico_menu_${currTypes}.svg`);
    },
  },
  methods: {
    ...mapActions(["showConfirm"]),
    goDetail: function () {
      this.$router.push(`/device/stop/${this.deviceId}`);
    },
    showModifyDialog(){
      this.$emit('showModifyDialog' , this.moduleId); 
    },
    showDeleteDialog() {
      console.log("click delete dialog");

      const dialogArgs = {
        msg: "삭제하시겟습니까?",
        cb: (rtn) => {
          console.log(rtn);
          if (rtn) {
            this.fnDeleteModule();
          }
        },
      };
      this.showConfirm(dialogArgs);
    },
    async fnDeleteModule() {
      const param = {
        deviceId: this.deviceId,
        moduleId: this.moduleId,
        datFlag: "D",
      };
     await ComApi.post("/api/device/module/process", param);

    
      this.$emit('fnReflesh')
    },
  },
};
</script>
<style lang=""></style>

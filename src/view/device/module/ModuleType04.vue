<template lang="">
  <div class="content flex_between" id="did">
    <div class="left_time flex_center_c">
      <img src="@/style/images/img_did.png" alt="" id="cctv_img" />
    </div>
    <div class="right_content flex_center">
      <div class="power">
        <h4 class="mr_25 li_55 mb_0">전원</h4>
        <div>
          <div class="power_line">
            <div class="on_green">
              <input
                type="radio"
                name="power"
                id="on_green"
                value="ON"
                @click="fnChangePower"
                v-model="power"
                checked
              />
              <label for="on_green">ON</label>
            </div>
            <div class="off_grey">
              <input
                type="radio"
                name="power"
                id="off_grey"
                value="OFF"
                @click="fnChangePower"
                v-model="power"
              />
              <label for="off_grey">OFF</label>
            </div>
          </div>
        </div>
      </div>
      <div class="ab_link">
        <a href="https://makesflat.co.kr/" class="a_link" target="_blank"
          >컨텐츠 관리툴 바로가기</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters , mapActions } from 'vuex';
export default {
  props: { module: { type: Object } },
  data: () => ({ power: "OFF" , currentModule :{} }),
  computed:{

    ...mapGetters(["getUserInfo"]),
  },
  mounted(){

    console.log('binded param :' , this.module);
      this.currentModule = {...this.module};


  },
  methods: {
    ...mapActions(["commandOn", "commandOff"]),
    fnChangePower() {
      console.log("on power clicked !!!");
      const command = {
          userId: this.getUserInfo.userId,
          deviceId: this.currentModule.deviceId,
          moduleId: this.currentModule.moduleId,
        };

        console.log('command : ', command);
        if (this.light === "ON") {
          this.commandOn(command);
        } else {
          this.commandOff(command);
        }
    },
  },
};
</script>
<style lang=""></style>

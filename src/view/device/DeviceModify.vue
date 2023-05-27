<template lang="">
  <Transition>
    <div class="ab_membership" v-if="device.deviceId">
      <div class="header">
        <h1>신규 장비 등록</h1>
        <p>스마트 시설물을 등록해주세요.</p>
      </div>

      <div class="input_box">
        <div class="input_area">
          <label for="id_e">장비유형 </label>
          <select id="id_e" class="input_style" v-model="device.deviceCd">
            <option
              v-for="code in deviceTypeList"
              v-bind:key="code.comCd"
              :value="code.comCd"
            >
              {{ code.comCdNm }} ({{ code.comCd }})
            </option>
          </select>
        </div>

        <div class="input_area">
          <label for="pw_c">장비명</label>
          <input
            type="text"
            id="pw_c"
            v-model="device.deviceNm"
            class="input_style"
            placeholder="비밀번호를 확인해주세요"
          />
        </div>

        <div class="input_area">
          <label for="pw_d">첨부파일</label>
          <input
            v-if="!device.deviceImg"
            type="file"
            id="pw_d"
            class="input_style"
            @change="imageChanged"
            placeholder="첨부 파일을 선택해주세요"
          />
          <img :src="device.deviceImg" class="device-preview" />
        </div>
      </div>

      <div class="btn_area">
        <button class="btn grey_line mr_17" @click="$emit('onClose')">
          취소하기
        </button>
        <button class="btn bg_grren" @click="fnSave">
          {{ msgConf.SAVE }}
        </button>
      </div>
    </div>
  </Transition>
</template>
<script>
import ComApi from "@/service/ComApi";
import { mapGetters } from "vuex";
import comApi from "@/service/ComApi";
import msgConf from "@/message/msgConf";
export default {
  data: () => ({
    list: [],
    msgConf,
    device: { deviceNm: "", deviceCd: "POLL", deviceImg: "" },
  }),
  props: { deviceId: { type: String } },
  computed: {
    ...mapGetters(["getComCode", "getDeviceList"]),
    deviceTypeList() {
      return this.getComCode.filter((v) => v.comGrpCd === "DEVICE_TYPE_CD");
    },
  },
  mounted() {
    this.searchDeviceInfo();
  },
  methods: {
    async searchDeviceInfo() {
      const image = await this.getImages();

      const { data } = await await ComApi.post("/device/list", {});
      console.log(data);
      const recvDevice = data.filter((v) => v.deviceId === this.deviceId)[0];
      
      this.device = { ...recvDevice, deviceImg: image };

      console.log(this.device);
    },

    async getImages() {
      console.log("/device/images/" + this.deviceId);
      const { data } = await ComApi.get("/device/images/" + this.deviceId);
      return data;
    },

    imageChanged(e) {
      console.log(e);
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.device.deviceImg = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    async fnSave() {
      const param = { ...this.device };
      const { data } = await comApi.post("/device/save", param);
      console.log(data);
    },
  },
};
</script>
<style scoped>
.device-preview {
  height: 200px;
}
</style>

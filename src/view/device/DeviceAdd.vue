<template lang="">
  <div class="stop_wrap" @keyup.esc="fnClose">
    <div class="menu_box bg_gray"  v-if="!device.deviceCd">
      <button class="btn_close" @click="fnClose"></button>
      <div class="facility">
        <figure v-for="v in getComDeviceType" v-bind:key="v.comCd">
          <img
            :src="fnGetDeviceCdImg(v)"
            :alt="v.comCdNm"
            @click="fnOnDeviceCodeSelected(v.comCd)"
            :class="{h_220:v.comCd === 'POLL'}"
           
          />
          <figcaption>{{ v.comCdNm }}</figcaption>
        </figure>
      </div>
    </div>
    <div class="menu_box bg_gray flex_between w_1153" v-if="device.deviceCd">
      <div class="map_area" >
        <img :src="device.imgSrc" />
      </div>
      <div class="right_write">
        <div class="write">
          <label for="f_name"
            >스마트 시설물 이름(설치위치를 알아보기 쉽도록)을 입력하세요</label
          >
          <input
            type="text"
            id="f_name"
            v-model="device.deviceNm"
            placeholder="ex) ㅇㅇ우체국 스마트 정류장"
          />

          <div class="file_input mt_70">
            <label for="file_route"
              >스마트 시설물이 설치된 지도 이미지를 업로드 하세요</label
            >
            <input
              type="text"
              readonly="readonly"
              title="File Route"
              id="file_route"
            />
            <label for="upload" class="btn_up">화일업로드</label>
            <input
              type="file"
              id="upload"
              @change="imageChanged"
            />
          </div>
        </div>
        <div class="btn_area bd_none">
          <button class="btn grey_line mr_17" @click="$emit('onClose')">취소하기</button>
          <button class="btn btn_green"  @click="fnSave">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import comApi from "@/service/ComApi";
import msgConf from "@/message/msgConf";
export default {
  data: () => ({
    list: [],
    msgConf,
    device: { deviceNm: "", deviceCd: "", imgSrc: "" },
  }),
  computed: {
    ...mapGetters(["getComCode", "getComDeviceType"]),
    deviceTypeList() {
      return this.getComCode.filter((v) => v.comGrpCd === "DEVICE_TYPE_CD");
    },
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.fnClose();
      }
    });
  },
  methods: {
    fnClose() {
      this.$emit("onClose");
    },
    fnOnDeviceCodeSelected(selectedCode) {
      this.device.deviceCd = selectedCode;
    },

    fnGetDeviceCdImg(code) {
      const imgPath = code.refVal01;

      return require(`@/style/images/${imgPath}.png`);
    },
    imageChanged(e) {
      var input = e.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.device.imgSrc = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async fnSave() {
      const param = { ...this.device, datFlag: "I" };
      const { data } = await comApi.post("/api/device/save", param);
      console.log(data);
      this.$emit("onClose");
    },
  },
};
</script>
<style scoped>
.device-preview {
  height: 200px;
}
.facility img{
  max-width: 300px;
  margin: auto;
  align-items: center;
}

.facility figure:hover{
  scale: .9;
}
</style>

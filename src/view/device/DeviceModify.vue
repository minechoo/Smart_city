<template lang="">
  <Transition>
    <div class="ab_membership" v-if="device.deviceId">
      <div class="header">
        <h1> 장비 변경 </h1>       
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

        <div class="input_area"  v-if="!device.deviceImg">
          <label for="pw_d">첨부파일</label>
          <input
            type="file"
            id="pw_d"
            class="input_style"
            @change="imageChanged"
            placeholder="첨부 파일을 선택해주세요"
          />
        </div>
      </div>

      <div class="input_area"  v-if="device.deviceImg">
        <img :src="device.deviceImg" class="device-preview" />
      </div>

      <div class="btn_area">

        <button class="btn bg_pink mr_17" @click="$emit('onClose')">
          삭제하기
        </button>

        <button class="btn grey_line mr_17" @click="$emit('onClose')">
          취소하기
        </button>
        <button class="btn bg_green" @click="fnSave">
          {{ msgConf.SAVE }}
        </button>
      </div>
    </div>
  </Transition>
</template>
<script>
import ComApi from "@/service/ComApi";
import { mapGetters , mapActions} from "vuex";
import msgConf from "@/message/msgConf";
export default {
  data: () => ({
    list: [],
    msgConf,
    device: { deviceNm: "", deviceCd: "POLL", deviceImg: "" },
  }),
  props: { deviceId: { type: String } },

  computed: {
    ...mapGetters(["getComCode", "getDeviceList" ]),
    
    deviceTypeList() {
      return this.getComCode.filter((v) => v.comGrpCd === "DEVICE_TYPE_CD");
    },
  },
  mounted() {
    this.searchDeviceInfo();
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        this.fnClose();
      }
    });
  },
  methods: {
    ...mapActions(['getServDeviceList']),
    fnClose(){
      this.$emit('onClose');
    },
    // 서버에 저장 된 Device 정보 조회 
    async searchDeviceInfo() {
      const image = await this.getImages();
      const { data } = await await ComApi.post("/api/device/list", {});
      const recvDevice = data.filter((v) => v.deviceId === this.deviceId)[0];
      
      this.device = { ...recvDevice, deviceImg: image };

      console.log(this.device);
    },

    async getImages() {
      console.log("/device/images/" + this.deviceId);
      const { data } = await ComApi.get("/api/device/images/" + this.deviceId);
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
      const param = { ...this.device , datFlag :'U' };

      console.log(param);
      const { data } = await ComApi.post("/api/device/save", param);
      console.log(data);
      await this.getServDeviceList();
      this.fnClose();
    },
  },
};
</script>
<style scoped>
.device-preview {
  height: 200px;
}
</style>

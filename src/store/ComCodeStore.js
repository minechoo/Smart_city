import comApi from "../service/ComApi";

const codeStore = {
  state() {
    return { codeList: [] };
  },
  mutations: {
    setCodeList(state, codeList) {  
     
      state.codeList = codeList;
    },
  },
  actions: {
    async getCodeList(context) {
      const { data } = await comApi.post("/code/list");
      console.log(data);
      context.commit("setCodeList", data);
      return true
    },
  },
  getters: {
    getComCode(state) {
      return state.codeList;
    },
    getComDeviceType(state) {
     
      const deviceTypeList = state.codeList.filter((v) => v.comGrpCd === "DEVICE_TYPE_CD");
     
      return deviceTypeList;
    },
  },
};

export default codeStore;

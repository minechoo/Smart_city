import comApi from "../service/ComApi";

const codeStore = {
  state() {
    return { codeList: [] };
  },
  mutations: {
    setCodeList(state, codeList) {
      state.deviceList = codeList;
    },
  },
  actions: {
    async getCodeList(context) {
      const { data } = await comApi.post("/code/list");
      context.commit("setCodeList", data);
    },
  },
  getters: {
    getComCode(state) {
      return state.codeList;
    },
    getDeviceList(state) {
      return state.codeList.filter((v) => v.comGrpCd === "DEVICE_TYPE");
    },
  },
};

export default codeStore;

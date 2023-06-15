import comApi from "@/service/ComApi";
const moduleStore = {
  state() {
    return { deviceId: "", moduleList: [] };
  },
  mutations: {
    setDeviceId(state, deviceId) {
      state.deviceId = deviceId;
    },
    setModuleList(state, moduleList) {
      state.moduleList = moduleList;
    },
    clearModuleList(state) {
      state.moduleList = [];
    },
  },
  actions: {
    async reloadModuleInfo(context) {
      const param = { deviceId: localStorage.getItem("deviceId") };

      await context.dispatch("fnSearchModuleList", param);
    },

    async fnSearchModuleList(context, { deviceId }) {
      localStorage.setItem("deviceId", deviceId);
      const { data } = await comApi.post("/api/device/module/list", {
        deviceId,
      });

      if (!data.code) {
        context.commit("setModuleList", data);
      } else {
        context.commit("clearModuleList");
      }

      return true;
    },
  },
  getters: {
    getModuleList(state) {
      return state.moduleList;
    },
  },
};

export default moduleStore;

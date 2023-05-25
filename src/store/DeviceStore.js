const deviceStore = {
  state() {
    return { deviceList: [] };
  },
  mutations: {
    setDeviceList(state, deviceList) {
      state.deviceList = deviceList;
    },
  },
  actions: {
    setDeviceList(context, { deviceList }) {
      context.commit("setDeviceList", deviceList);
    },
  },
  getters: {
    getDeviceList(state) {
      return state.deviceList;
    },
  },
};

export default deviceStore;

import comApi from "../service/ComApi";
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
    async getServDeviceList(context){

      const {data}  = await comApi.post('/device/list');

      context.commit('setDeviceList', data);
      return true;
    }
  },
  getters: {
    getDeviceList(state) {
      return state.deviceList;
    },
  },
};

export default deviceStore;

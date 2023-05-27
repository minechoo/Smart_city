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
    async getDeviceList(context){
      
      const {data}  = await comApi.post('/device/list');

      context.commit('setDeviceList', data);
    }
  },
  getters: {
    getDeviceList(state) {
      return state.deviceList;
    },
  },
};

export default deviceStore;

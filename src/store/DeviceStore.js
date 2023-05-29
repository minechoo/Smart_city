import comApi from "../service/ComApi";
const deviceStore = {
  state() {
    return { deviceList: [] };
  },
  mutations: {
    setDeviceList(state, deviceList) {
      state.deviceList = deviceList;
    },
    clear(state){
      state.deviceList = [];
    }
  },
  actions: {
    setDeviceList(context, { deviceList }) {
      context.commit("setDeviceList", deviceList);
    },
    async getServDeviceList(context){

      const {data}  = await comApi.post('/device/list');

      if(!data.code){
        context.commit('setDeviceList', data);
      }else{
        context.commit('clear');
      }
      
      return true;
    }, clearDeviceList(context){
      context.commit('clear');
    }
  },
  getters: {
    getDeviceList(state) {
      return state.deviceList;
    },
  },
};

export default deviceStore;

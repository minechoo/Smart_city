import CmdMsg from "@/utils/CmdMsg";
const socketStore = {
  state() {
    return { socket: null, messages: [] , connected: false};
  },
  mutations: {
    SET_SOCKET(state, socket) {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = socket;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    setConnect(state , connected){
      state.connected = connected;
    }
  },
  actions: {
    connectSocket({ commit , dispatch}, deviceId) {

      commit('setConnect' , false);
      const host = location.host.includes("localhost")
        ? "localhost"
        : location.host;
   
      const socket = new WebSocket(`ws://${host}/ws/device/${deviceId}`);

      socket.addEventListener("open", () => { 
        commit('setConnect' , true);
      });

      socket.addEventListener("message", (event) => {
        const message = JSON.parse(JSON.parse(event.data));
        if(message.msgType === 'STAT'){
        
          dispatch('reloadModuleInfo');
        } else{
          commit("ADD_MESSAGE", message);
        }
        
      });

      socket.addEventListener("close", () => {
        // Handle socket close event if needed
      });

      commit("SET_SOCKET", socket);
    },
    sendMessage({ state }, message) {
      if (state.socket) {
        state.socket.send(JSON.stringify(message));
      }
    },
    getStatus({ state }, { userId, deviceId }) {
      
      state.socket.send(JSON.stringify(CmdMsg.status(userId, deviceId)));
    },
    commandOn({ state }, { userId, deviceId, moduleId }) {
      state.socket.send(JSON.stringify(CmdMsg.on(userId, deviceId, moduleId)));
    },
    commandOff({ state }, { userId, deviceId, moduleId }) {
      state.socket.send(JSON.stringify(CmdMsg.off(userId, deviceId, moduleId)));
    },
    commandCron({ state }, { userId, deviceId, moduleId, start, end }) {
      state.socket.send(
        JSON.stringify(CmdMsg.cron(userId, deviceId, moduleId, start, end))
      );
    },
  },
  getters: {
    getMessages(state) {
      return state.getMessages();
    },
    getSocketConnected(state){
      return state.connected;
    }
  },
};

export default socketStore;

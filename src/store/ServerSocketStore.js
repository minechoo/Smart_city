import CmdMsg from "@/utils/CmdMsg";
const socketStore = {
  state() {
    return { socket: null, messages: [] };
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
  },
  actions: {
    connectSocket({ commit }, deviceId) {

      const host = location.host.includes('localhost') ?'localhost' : location.host;
      console.log('host : ' , host);
      const socket = new WebSocket(`ws://${host}/ws/device/${deviceId}`);

      socket.addEventListener("open", () => {
        console.log("connection open ");
      });

      socket.addEventListener("message", (event) => {
        console.log('got message ,', event.data);
        const message = JSON.parse(event.data);
        commit("ADD_MESSAGE", message);
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
  },
};

export default socketStore;

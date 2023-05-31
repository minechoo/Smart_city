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
      const socket = new WebSocket(`ws://localhost:8180/ws/device/${deviceId}`);

      socket.addEventListener("open", () => {
        console.log("connection open ");
      });

      socket.addEventListener("message", (event) => {
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
    onModule({ state }, module) {
      const command = {...module}
      state.socket.send(JSON.stringify(command));
    },
    offModule({ state }, module) {
      const command = {...module}
      state.socket.send(JSON.stringify(command));
    },
  },
  getters: {
    getMessages(state) {
      return state.getMessages();
    },
  },
};

export default socketStore;

import comApi from "./service/ComApi";
import { createApp } from "vue";
import App from "./App.vue";

import "@/style/css/reset.css";
import "@/style/css/common.css";
import "@/style/css/ui.css";


import { createWebHistory, createRouter } from "vue-router";

import BasicLayout from "./layout/BasicLayout.vue";
import LoginPage from "./view/login/LoginPage.vue";
import MainPage from "./view/MainPage.vue";
import NotFound from "./layout/NotFound.vue";
import DeviceMain from "./view/device/DeviceMain.vue";
import ModuleMain from "./view/device/ModuleMain.vue";
import DashBoard from "./view/dashboard/DashBoard.vue";

import ComMessage from "./components/ComMessage.vue";
import createPersistedState from "vuex-persistedstate";

//store
import messageStore from "./store/ComMessageStore.js";
import userStore from "./store/UserInfoStore";
import deviceStore from "./store/DeviceStore";
import codeStore from "./store/ComCodeStore";
import socketStore from "./store/ServerSocketStore";

import { createStore } from "vuex";

const app = createApp(App);

const comStore = createStore({
  modules: {
    userStore,
    messageStore,
    deviceStore,
    codeStore,
    socketStore,
  },
  plugins: [
    createPersistedState({
      paths: ["userStore", "codeStore", "deviceStore"],
    }),
  ],
});

app.use(comStore);

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: "/", component: MainPage },
    { path: "/dash", component: DashBoard },
    { path: "/login", component: LoginPage },
    {
      path: "/device",
      component: BasicLayout,
      children: [
        {
          path: ":deviceCd",
          component: DeviceMain,
        },
        {
          path: ":deviceCd/:deviceId",
          component: DeviceMain,
        },
        {
          path: "detail/:deviceCd/:deviceId",
          component: DeviceMain,
        },
        {
          path: "module/:deviceCd/:deviceId/:moduleId",
          component: ModuleMain,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

comApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log( error?.response?.data?.code , error?.response?.data?.code === '-403'); 
  
    
    if(error?.response?.data?.code === '-403'){

      comStore.dispatch("showError", {
        msg: '세션이 종료 되엇습니다. ',
        cb: () => {comStore.dispatch('doLogout', {});},
      });

      
      return;
    }
    comStore.dispatch("showError", {
      msg: error?.response?.data?.message || error.response.statusText,
      cb: () => {},
    });
    return Promise.reject(error);
  }
);

app.config.globalProperties.$axios = comApi;
app.use(router);
app.component("ComMessage", ComMessage);

app.mount("#app");

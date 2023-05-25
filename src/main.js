import comApi from "./service/ComApi";
import { createApp } from "vue";
import App from "./App.vue";

import "./style/css/common.css";

import { createWebHistory, createRouter } from "vue-router";

import BasicLayout from "./layout/BasicLayout.vue";
import LoginPage from "./view/login/LoginPage.vue";
import MainPage from "./view/MainPage.vue";
import NotFound from "./layout/NotFound.vue";
import DeviceMain from "./view/device/DeviceMain.vue";
import DashBoard from "./view/dashboard/DashBoard.vue";

import ComMessage from "./components/ComMessage.vue";

//store
import messageStore from "./store/ComMessageStore.js";
import userStore from "./store/UserInfoStore";
import deviceStore from "./store/DeviceStore";

import { createStore } from "vuex";

const app = createApp(App);

const comStore = createStore({
  modules: {
    userStore,
    messageStore,
    deviceStore,
  },
});

app.use(comStore);

const router = createRouter({
  history: createWebHistory("/sample/"),
  routes: [
    { path: "/", component: MainPage },
    { path: "/dash", component: DashBoard },
    { path: "/login", component: LoginPage },
    {
      path: "/device",
      component: BasicLayout,
      children: [
        {
          path: ":areaId",
          component: DeviceMain,
        },
        {
          path: ":areaId/:deviceId",
          component: DeviceMain,
        },
        {
          path: "detail/:areaId/:deviceId",
          component: DeviceMain,
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
    comStore.dispatch("showError", {
      msg: error?.response?.data?.message,
      cb: () => {},
    });
    return Promise.reject(error);
  }
);

app.config.globalProperties.$axios = comApi;
app.use(router);
app.component("ComMessage", ComMessage);

app.mount("#app");

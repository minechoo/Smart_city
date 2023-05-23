import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'

import './style/css/common.css';


import { createWebHistory, createRouter } from 'vue-router';

import LoginPage from './view/login/LoginPage.vue';
import MainPage from './view/MainPage.vue';
import NotFound from './layout/NotFound.vue';
import DashBoard from './view/dashboard/DashBoard.vue';
import messageStore from './state/ComMessageStore.js';
import ComMessage from './components/ComMessage.vue';
import userStore from './state/UserInfoStore';
import { createStore } from 'vuex';

const app = createApp(App);

app.use(createStore({
    modules: {
        userStore, messageStore
    }
}));


const router = createRouter({

    history: createWebHistory('/sample/'),
    routes: [
        { path: '/', component: MainPage }
        , { path: '/dash', component: DashBoard }
        , { path: '/login', component: LoginPage }
        , { path: '/:pathMatch(.*)*', component:NotFound }

    ]
});


axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});

axios.interceptors.response.use(response => { return response }, error => {

    messageStore.dispatch('showError', { msg: error.message });
    return Promise.reject(error);
});


app.config.globalProperties.$axios = axios;
app.use(router);
app.component('ComMessage', ComMessage);

app.mount('#app')


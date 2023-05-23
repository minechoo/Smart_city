<template>
    <header>
        <h1><a @click="goMain">스마트 시설물 통합 운영 관리 시스템</a></h1>
        <div class="right_section">
            <div class="logo">업체명 또는 이름</div>
            <div class="info" @click="fnShowMyPage">내정보 변경</div>
            <div class="login" @click="fnLogout">로그아웃</div>
        </div>

    </header>
    <Transition>
        <router-view></router-view>
    </Transition>

    <Transition>
        <div v-if="showDialog" class="dialog-dim">
            <UserInfo @onClose="fnHideMyPage"/>
        </div>
    </Transition>
</template>
<script>

import UserInfo from '@/view/login/UserInfo.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    components:{UserInfo},

    data() {

        return {

            showDialog: false
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        ...mapActions(['doLogin', 'doLogout']),

        fnShowMyPage() {

            this.showDialog = true
            console.log('show dialog', this.showDialog);
        },
        fnHideMyPage() {
            this.showDialog = false
        },
        fnLogout() {
            this.doLogout();
            this.$router.push('/');
            // this.$store.dispatch('showConfirm', {
            //     msg: 'Logout?', cb: (rtn) => {
            //         if (rtn) {
            //             this.doLogout();
            //         }
            //     }
            // });
        },
        goMain() {
            this.$router.push('/dash')
        }
    }
}
</script>

<style>
.dialog-dim {

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
}
</style>
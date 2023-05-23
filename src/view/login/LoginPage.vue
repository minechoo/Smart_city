<template>
    <div class="login_wrap">
        <div class="login_area">
            <div class="al_center">
                <a href="#">
                    <img src="@/style/images/system.png" alt="">
                    <h1>스마트 시설물 통합 운영 관리 시스템</h1>
                </a>
            </div>
            <div class="login_box">
                <input type="text" placeholder="아이디" id="ids" class="input_login" v-model="userId">
                <label for="ids" class="offscreen">아이디</label>
                <input type="password" placeholder="비밀번호" id="pw" class="input_login" v-model="userPassword">
                <label for="pw" class="offscreen">비밀번호</label>

                <button type="submit" class="btn_login" @click="fnDoLogin">로그인</button>
                <input type="checkbox" name="" id="remember" v-model="rememberMe">
                <label for="remember" >아이디 기억하기</label>
                <div class="flex_link"> 
                    <a href="#" @click="() => fnSetFindMe(true)">아이디/비밀번호 찾기</a>
                    <a href="#" @click="() => fnShowSignUp(true)">회원가입하기</a>
                </div>
            </div>

        </div>
    </div>
    <Transition>
        <div class="dialog-dim" v-if="showFindMe" >
            <UserSearch @onCloseDialog="() => fnSetFindMe(false)" />
        </div>
    </Transition>
    <Transition>
        <div class="dialog-dim" v-if="showSignUp">
            <UserSignUp v-if="showSignUp" @onClose="() => fnShowSignUp(false)" />
        </div>
    </Transition>
</template>
<script>
import { mapActions } from 'vuex';
import UserSearch from './UserSearch.vue';
import UserSignUp from './UserSignUp.vue';
export default {
    components: { UserSearch, UserSignUp },
    data() {
        return {
            userId: '', userPassword: ''
            , rememberMe: false
            , showFindMe: false
            , showSignUp: false
        }
    }, methods: {
        ...mapActions(['doLogin', 'setLogin']),

        fnShowSignUp(flag) {
            this.showSignUp = flag
        },

        fnSetFindMe(showFlag) {
            console.log('call cancel button');
            this.showFindMe = showFlag
        }
        , fnDoLogin() {

            const param = {
                userId: this.userId,
                password: this.userPassword
            }

            let isLocal = true;

            if (isLocal) {
                this.setLogin(param);
                this.$router.push('/dash')
            } else {
                this.doLogin(param);

            }
        }

    }
}
</script>


import comApi from "../service/ComApi";


const userStore = {
    state() {
        return { userInfo: {isLogin:false} }
    }, mutations: {
        loginSuccess(state, payload) {
            const newUserInfo =  {...payload , isLogin : true};
            state.userInfo = newUserInfo;
        }, 
        logout(state) {
            state.userInfo.isLogin = false;
        }
    }, actions: {

        async doLogin(context, { userId, userPwd }) {
            const reqCredencial = { userId, userPwd };
            
            try {
                
                const { data } = await comApi.post('/api/user/signIn', reqCredencial);
                if(data){
                    context.commit('loginSuccess', data);
                }
            } catch (err) {
              //  context.commit('logout');
            }
        },

        doLogout(context){
            console.log('calll logout actions ')
            context.commit('logout');
        },


        setLogin(context, { userId, password }){
            const reqCredencial = { userId, password };
            context.commit('loginSuccess' , reqCredencial);

     

        }

    }, getters: {
        isLogin(state) {
            return state.userInfo.isLogin;
        },
        getUserInfo(state){
            return state.userInfo;
        }
    }
}; 


export default userStore;
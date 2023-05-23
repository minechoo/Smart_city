import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const userStore = {
    state() {
        return { userInfo: {isLogin:false} }
    }, mutations: {
        loginSuccess(state, payload) {
            
            const newUserInfo =  {...payload , isLogin : true};
            state.userInfo = newUserInfo;

            console.log(newUserInfo);
           // state.userInfo = payload;
        }, 
        logout(state) {
            state.userInfo.isLogin = false;
        }
    }, actions: {

        async doLogin(context, { userId, password }) {
            const reqCredencial = { userId, password };
            console.log(reqCredencial);
            
            try {
                const { data } = await instance.post('/login', reqCredencial);
                if(data.state === 200){
                    context.commit('loginSuccess', data);
                }
            } catch (err) {
                console.log(err);
                context.commit('logout');
            }
        },

        doLogout(context){
            context.commit('logout');
        },


        setLogin(context, { userId, password }){

            const reqCredencial = { userId, password };
            context.commit('loginSuccess' , reqCredencial);
        }

    }, getters: {
        isLogin(state) {
            return state.userInfo.isLogin;
        }
    }
}; 


export default userStore;
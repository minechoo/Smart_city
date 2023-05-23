import ComApi from "./ComApi";

export default {
    login(data) {
        return ComApi.post('/login', data)
    },
    logout(data) {
        return ComApi.post('/logout', data)
    }
}
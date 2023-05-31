import ComApi from "./ComApi";

export default {
    login(data) {
        return ComApi.post('/api/login', data)
    },
    logout(data) {
        return ComApi.post('/api/logout', data)
    }
}
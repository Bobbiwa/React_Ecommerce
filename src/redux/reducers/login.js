import { SAVE_USER_INFO, DELETE_USER_INFO } from '../constant'
const username = localStorage.getItem('username')
const token = localStorage.getItem('token')
let init = {
    username: username || '',
    token: token || '',
    //redux带上，无需以后判断
    isLogin: username && token ? true : false
}
export default function login(prestate = init, action) {
    const { type, data } = action
    switch (type) {
        case SAVE_USER_INFO:
            return { username: data.username, token: data.token, isLogin: true }
        case DELETE_USER_INFO:
            return { username: '', token: '', isLogin: false }
        default:
            return prestate
    }
}
import { SAVE_USER_INFO ,DELETE_USER_INFO} from '../constant'
export const saveUserInfoAction = (value) => {
    localStorage.setItem('username', JSON.stringify(value.username))
    localStorage.setItem('token', value.token)
    return { type: SAVE_USER_INFO, data: value }
}

export const deleteUserInfoAction = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    return {type: DELETE_USER_INFO}
}
import { createSlice } from '@reduxjs/toolkit'

const username = localStorage.getItem('username')
const token = localStorage.getItem('token')

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        username: username || '',
        token: token || '',
        isLogin: username && token ? true : false
    },
    reducers: {
        saveUserInfo: (state, { payload }) => {
            state.username = payload.username
            state.token = payload.token
            state.isLogin = true
        },
        logout: (state) => {
            state.username = ''
            state.token = ''
            state.isLogin = false
        }
    }
})

export const { saveUserInfo, logout } = userInfoSlice.actions
export default userInfoSlice.reducer
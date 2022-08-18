import axios from 'axios'
import { message } from 'antd'
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from '../redux/store'
axios.interceptors.request.use((config)=>{
    //progress bar
    NProgress.start()
    //Carry token in the request header
    const {token} = store.getState().userInfo
    if(token) config.headers.Authorization = `xxx${token}`
    return config
})

axios.interceptors.response.use((res) => {
    //progress bar
    NProgress.done()
    return res
}, (err) => {
    NProgress.done()
    message.error(err.message, 1)
    //Break the promise chain
    return new Promise(()=>{})
})

export default axios

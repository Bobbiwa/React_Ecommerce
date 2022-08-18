import myAxios from './myAxios'
import jsonp from "jsonp";
import { message } from 'antd'
import { baseUrl } from '../config/index'


export const reqWeather = () => {
    return new Promise((res, rej) => {
        jsonp('https://restapi.amap.com/v3/weather/weatherInfo?city=320500&key=999f3beded123a2a06e96b98aac5c2a0', (err, data) => {
            if (err) {
                message.error('Failed to request weather interface, please contact the administrator')
                rej(err)
            } else {
                const { weather, temperature, city } = data.lives[0]
                res({ weather, temperature, city })
            }
        })
    })
}

export const reqLogin = (data) => myAxios.post(`${baseUrl}/auth/login`, data)
export const reqCategoryList = () => myAxios.get(`${baseUrl}/products/categories`)
export const reqProductList = () => myAxios.get(`${baseUrl}/products`)
export const reqSearchProduct = (data) => myAxios.get(`${baseUrl}/products/search`, { params: data })
export const reqProductDetail = (data) => myAxios.get(`${baseUrl}/products/${data}`)
export const reqUserList = () => myAxios.get(`${baseUrl}/users`)
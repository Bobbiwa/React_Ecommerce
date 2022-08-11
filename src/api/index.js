import jsonp from "jsonp";
import {message} from 'antd'
export const reqWeather = ()=>{
    return new Promise((res,rej)=>{
        jsonp('https://restapi.amap.com/v3/weather/weatherInfo?city=320500&key=999f3beded123a2a06e96b98aac5c2a0',(err,data)=>{
            if(err) {
                message.error('Failed to request weather interface, please contact the administrator')
                rej(err)
            } else {
                const {weather,temperature,city} = data.lives[0]
                res({weather,temperature,city})
            }
        })
    })
}
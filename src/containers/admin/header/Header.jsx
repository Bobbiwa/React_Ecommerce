import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import screenfull from 'screenfull';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { reqWeather } from '../../../api/index'
import { timeFormat } from '../../../config/index'
import './css/header.less';
export default function Header() {
  const [isFull, setIsFull] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY年 MM月DD日 HH:mm:ss'))
  const [weatherInfo, setWeatherInfo] = useState({})
  const [titleInfo, setTitleInfo] = useState('/admin/home')
  const location = useLocation()
  let {pathname} = location

  useEffect(() => {
    setInterval(() => {
      setDate(dayjs().format(timeFormat))
    }, 1000)

    //Get weather
    const getWeather = async () => {
      let result = await reqWeather()
      setWeatherInfo(result)
    }
    getWeather()

    //Get the title from the URL
    const getTitle = () => {
      // let { pathname } = location
      if (pathname.includes('product')) {
        setTitleInfo('product')
      } else {
        let title = pathname.split('/').reverse()[0]
        setTitleInfo(title)
      }
    }
    getTitle()
  }, [pathname])



  //Full-screen switch
  const fullScreen = () => {
    screenfull.toggle();
    setIsFull(!isFull)
  };

  return (
    <header className='header'>
      <div className='header-top'>
        <Button size='small' onClick={fullScreen}>
          {!isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
        </Button>
        <span className='username'>欢迎admin</span>
        <Button type='link' size='small'>退出登录</Button>
      </div>

      <div className='header-bottom'>
        <div className='header-bottom-left'>
          {titleInfo.toLocaleUpperCase()}
        </div>
        <div className='header-bottom-right'>
          <p style={{ marginBottom: '0px' }}>{date}</p>
          {`${weatherInfo.city}  ${weatherInfo.weather} 温度：${weatherInfo.temperature}℃`}
        </div>
      </div>
    </header>
  )
}

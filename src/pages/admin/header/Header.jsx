import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import screenfull from 'screenfull';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Popconfirm } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { reqWeather } from '../../../api/index'
import { TIME_FORMAT } from '../../../config/index'
import { deleteUserInfoAction } from '../../../redux/actions/login'
import './header.less';

export default function Header() {
  const [isFull, setIsFull] = useState(false)
  const [date, setDate] = useState(dayjs().format(TIME_FORMAT))
  const [weatherInfo, setWeatherInfo] = useState({})
  const [titleInfo, setTitleInfo] = useState('/admin/home')
  const userInfo = useSelector(state => state.userInfo ) // mapStateToProps
  const dispatch = useDispatch()  // mapDispatchToProps
  const location = useLocation()
  let { pathname } = location

  useEffect(() => {
    setInterval(() => {
      setDate(dayjs().format(TIME_FORMAT))
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
  const handleFullScreen = () => {
    screenfull.toggle();
    setIsFull(!isFull)
  };

  const handleLogoutConfirm = () => {
    dispatch(deleteUserInfoAction())  
  }

  return (
    <header className='header'>
      <div className='header-top'>
        <Button size='small' onClick={handleFullScreen}>
          {!isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
        </Button>
        <span className='username'>欢迎{userInfo.username}</span>
        <Popconfirm onConfirm={handleLogoutConfirm} title="Are you sure？" okText="Yes" cancelText="No">
          <Button type='link' size='small'>退出登录</Button>
        </Popconfirm>
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
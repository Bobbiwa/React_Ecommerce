import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import menuList from '../../../config/menuConfig'
import logo from '../../../static/imgs/EpamLogo.jpeg'
import './css/sidebar.less'


//Functions of antD
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

//Own function: Making a list by recursion
const getList = (menuList) => {
    return menuList.reduce((pre, cur) => {
        if (!cur.children) {
            let resItem = getItem(cur.title, cur.key, cur.icon)
            return [...pre, resItem]
        } else {
            let resItem = getItem(cur.title, cur.key, cur.icon,
                getList(cur.children)
            )
            return [...pre, resItem]
        }
    }, [])
}
const items = getList(menuList)  //[{...},{...}]


export default function SideBar() {
    const navigate = useNavigate()
    const {pathname} = window.location


    //Click to jump
    const link = (e) => {
        navigate(e.key)
    }
    return (
        <div className='side_bar'>
            <img src={logo} className='logo_img' alt="Epam's logo" />
            <Menu
                className='menu'
                defaultSelectedKeys = {pathname.indexOf('product') !== -1? '/admin/product-about/product':pathname }
                defaultOpenKeys = {pathname.split('/').splice(2)}
                mode="inline"
                theme="dark"
                items={items}
                onClick={link}
            />
        </div>
    )
}

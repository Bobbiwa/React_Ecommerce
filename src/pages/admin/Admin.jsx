import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Spin } from 'antd';
import { useSelector } from 'react-redux'
import './admin.less'

const Header = lazy(() => import('./header/Header'));
const SideBar = lazy(() => import('./sideBar/SideBar'));
const Home = lazy(() => import('../home/Home'));
const Category = lazy(() => import('../category/Category'));
const Product = lazy(() => import('../product/Product'));
const Detail = lazy(() => import('../product/detail/Detail'));
const AddUpdate = lazy(() => import('../product/add-update/AddUpdate'));
const User = lazy(() => import('../user/User'));
const Role = lazy(() => import('../role/Role'));
const Bar = lazy(() => import('../bar/Bar'));
const Line = lazy(() => import('../line/Line'));
const Pie = lazy(() => import('../pie/Pie'));

const { Footer, Content, Sider } = Layout;

export default function Admin() {

    const isLogin = useSelector(state => state.userInfo.isLogin)

    if (!isLogin) {
        return <Navigate to='/login' />
    }
    return (
        <Layout className='admin'>
            <Sider width={240}>
                <SideBar />
            </Sider>
            <Layout>
                <Header />
                <Content className='content'>
                    <Suspense fallback={
                        <div className="example">
                            <Spin />
                        </div>}
                    >
                        <Routes>
                            <Route path='home' element={<Home />} />
                            <Route path='product-about/category' element={<Category />} />
                            <Route path='product-about/product' element={<Product />} />
                            <Route path='product-about/product/detail/:id' element={<Detail />} />
                            <Route path='product-about/product/add-update' element={<AddUpdate />} />
                            <Route path='product-about/product/add-update/:id' element={<AddUpdate />} />
                            <Route path='user' element={<User />} />
                            <Route path='role' element={<Role />} />
                            <Route path='charts/bar' element={<Bar />} />
                            <Route path='charts/line' element={<Line />} />
                            <Route path='charts/pie' element={<Pie />} />
                            <Route path='/' element={<Navigate to='home' />} />
                        </Routes>
                    </Suspense>
                </Content>
                <Footer className='footer'>推荐使用Google浏览器，获取最佳用户体验</Footer>
            </Layout>
        </Layout>
    )

}





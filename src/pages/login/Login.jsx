import React, { useRef } from 'react';
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api/index'
import {saveUserInfoAction} from '../../redux/actions/login'
import './login.less'
export default function Login() {
    const formInstance = useRef()
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.userInfo.isLogin)
    const dispatch = useDispatch()

    const onFinish = (values) => {
        formInstance.current.validateFields()
            //Form validation succeeded
            .then(async () => {
                const result = await reqLogin(values)
                const { status, data } = result
                if(status === 200) {
                    dispatch(saveUserInfoAction(data)) //save redux
                    navigate('/admin/home')
                } else {
                    message.warning('Username or password input error!')
                }
            }, () => {
                message.error('请输入正确格式！')
            })
    };

    //If you are already logged in, jump to admin directly
    if(isLogin) {
        return <Navigate to='/admin/home'/>
    }
    return (
        <div className='login'>
            <header>
                <h1>Manage System</h1>
            </header>
            <section>
                <h1>用户登录</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    ref={formInstance}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        className="item"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        className="item"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>

    )
}



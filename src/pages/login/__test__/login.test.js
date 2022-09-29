
import '../../../matchMedia.mock'; // Must be imported before the tested file
import React from 'react'
// import "@testing-library/jest-dom/extend-expect"  (不明白它是用来干嘛的)
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login'
import store from '../../../redux/store'
// import axios from 'axios';

// jest.mock(axios)

afterEach(cleanup)
describe('test view', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<Provider store={store}><Router><Login /></Router></Provider>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('should equal to Manage System', () => {
        render(<Provider store={store}><Router><Login /></Router></Provider>)
        expect(screen.getByTestId('title')).toHaveTextContent('Manage System')
    })
    it('should equal to user login', () => {
        render(<Provider store={store}><Router><Login /></Router></Provider>)
        expect(screen.getByTestId('userLogin')).toHaveTextContent('用户登录')
    })
    it('should equal to Login button', () => {
        render(<Provider store={store}><Router><Login /></Router></Provider>)
        expect(screen.getByTestId('login')).toHaveTextContent('Login')
    })
})

// it('test onFinish', () => {
//     axios.post.mockResolvedValueOnce({
//        "id": 15,
//        "username": "kminchelle",
//        "token": "eyxxx"
//     })
//     render(<Provider store={store}><Router><Login /></Router></Provider>)
//     fireEvent.click(screen.getByTestId('login'))

//     接下来我该如何测reLogin方法的返回值？难道是从api文件夹引入reLogin方法？
       
// })





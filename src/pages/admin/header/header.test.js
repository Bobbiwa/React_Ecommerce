import React from "react";
import { cleanup, render, screen} from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import Header from "./Header";

afterEach(cleanup)
it('should equal to logout', () => {
    render(<Provider store={store}><BrowserRouter><Header /></BrowserRouter></Provider>)
    expect(screen.getByTestId('logoutButton')).toHaveTextContent('退出登录')
})



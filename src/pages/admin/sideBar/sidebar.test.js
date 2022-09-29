import React from "react";
import { cleanup, render, screen } from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../../../redux/store'
import SideBar from './SideBar'

afterEach(cleanup)
it('should take a snapshot',()=>{
    const {asFragment} = render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(asFragment()).toMatchSnapshot()
})
it('should equal to Admin', () => {
    render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(screen.getByText('Admin')).toHaveTextContent('Admin')
})
it('should equal to Product', () => {
    render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(screen.getByText('Product')).toHaveTextContent('Product')
})
it('should equal to User Management', () => {
    render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(screen.getByText('User Management')).toHaveTextContent('User Management')
})
it('should equal to Role Management', () => {
    render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(screen.getByText('Role Management')).toHaveTextContent('Role Management')
})
it('should equal to Charts', () => {
    render(<Provider store={store}><BrowserRouter><SideBar /></BrowserRouter></Provider>)
    expect(screen.getByText('Charts')).toHaveTextContent('Charts')
})
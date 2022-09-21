
import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from '@testing-library/react'
import Login from './Login'

afterEach(cleanup)
it('should equal to Login',()=>{
    render(<Login/>)
    expect(screen.getByTestId('login')).toHaveTextContent('Login')
})
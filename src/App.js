import { Routes, Route, } from 'react-router-dom'
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import ProductList from './productList/ProductList';
import './App.less';



function App() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin/*' element={<Admin />} />
                <Route path='/product-list' element={<ProductList />} />
            </Routes>
        </>

    )
}

export default App;

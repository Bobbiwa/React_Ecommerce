import { Routes, Route, } from 'react-router-dom'
import Admin from './containers/admin/Admin';
import Login from './containers/login/Login';
import Demo from './Demo';
import './App.less';


function App() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin/*' element={<Admin/>} />
                <Route path='/demo' element={<Demo/>} />
            </Routes>
        </>

    )
}

export default App;

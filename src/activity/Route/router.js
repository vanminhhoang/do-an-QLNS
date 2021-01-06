import React from 'react'

//import BrowserRouter as Router when run reactjs
//import HashRouter as Router when run electron
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import components
import DangNhap from '../DangNhap/DangNhap'
import ForgotPassword from '../QuenMatKhau/QuenMatKhau'
import ResetPassword from '../LayLaiMatKhau/LayLaiMatKhau'
import ChangePassword from '../DoiMatKhau/DoiMatKhau'
import Dashboard from '../MainActivity/MainActivity'
import BaoCaoTienDo from '../../component/BaoCaoTienDo/BaoCaoTienDo'

function RouterApp() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={DangNhap} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <Route path="/ChangePassword" component={ChangePassword} />
                <Route path="/ResetPassword" component={ResetPassword} />
                <Route path="/Dashboard" component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default RouterApp

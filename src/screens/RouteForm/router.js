import React from 'react'

//import BrowserRouter as Router when run reactjs
//import HashRouter as Router when run electron
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import components
import Login from '../Login/Login'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import ResetPassword from '../ResetPassword/ResetPassword'
import ChangePassword from '../ChangePassword/ChangePassword'
import Dashboard from '../Dashboard/Dashboard'

function RouterApp() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <Route path="/ChangePassword" component={ChangePassword} />
                <Route path="/ResetPassword" component={ResetPassword} />
                <Route path="/Dashboard" component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default RouterApp

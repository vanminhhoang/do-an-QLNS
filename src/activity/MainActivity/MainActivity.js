import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    HashRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom'

import { DARK_LIGHT_MODE } from '../../reactRedux/ReduxAc'

// dark mode
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../Theme/theme'
import { GlobalStyles } from '../../Theme/global'

//import component
import HeaderDashboard from '../../component/HeaderDashboard/HeaderDashboard'
import SectionDashboard from '../../component/SectionDashboard/SectionDashboard'

import PhanCongNhanVien from './Chil_Screens/PhanCongNhanVien'
import TienDoCongTrinh from './Chil_Screens/TienDoCongTrinh/TienDoCongTrinh'
import ChiTietTienDoCongTrinh from './Chil_Screens/TienDoCongTrinh/Child_Screen/ChiTietTienDoCongTrinh'
import ChiTietNhanVien from './Chil_Screens/ChiTietNhanVien'
import DanhSachCongTrinh from './Chil_Screens/DanhSachCongTrinh'
import DanhSachNhanVien from './Chil_Screens/DanhSachNhanVien'
import DSHoanThanhCongTrinh from './Chil_Screens/DSHoanThanhCongTrinh'
import BangLuong from './Chil_Screens/BangLuong'

//import icon material
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    iconDarkMode: {
        position: 'fixed',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '83%',
        left: '90%',
        fontSize: '50px',
        cursor: 'pointer',
        zIndex: '1',
        transition: 'all 0.2s linear',

        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
    },
}))

function Dashboard() {
    const history = useHistory()

    const isDarkMode = useSelector((state) => state.isDarkMode)
    const dispatch = useDispatch()

    const classes = useStyles()
    // Nếu chưa đăng nhập không cho vào trang chủ
    if (!sessionStorage.getItem('info')) {
        var host = window.location.href
        host = host.slice(0, host.indexOf('#'))
        window.location.href = host
        return
    }

    return (
        <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Router>
                <div
                    style={{
                        width: '100%',
                        minHeight: '100vh',
                        position: 'relative',
                        // backgroundColor: '#e7ecf0',
                    }}
                >
                    <HeaderDashboard />

                    <Switch>
                        <Route
                            exact
                            path="/Dashboard/"
                            component={SectionDashboard}
                        />
                        <Route
                            path="/Dashboard/PhanCongNhanVien"
                            component={PhanCongNhanVien}
                        />
                        <Route
                            path="/Dashboard/ChiTietNhanVien"
                            component={ChiTietNhanVien}
                        />

                        <Route
                            exact
                            path="/Dashboard/TienDoCongTrinh"
                            component={TienDoCongTrinh}
                        />
                        <Route
                            path="/Dashboard/TienDoCongTrinh/ChiTietTienDoCongTrinh"
                            component={ChiTietTienDoCongTrinh}
                        />

                        <Route
                            path="/Dashboard/DanhSachNhanVien"
                            component={DanhSachNhanVien}
                        />
                        <Route
                            path="/Dashboard/DanhSachCongTrinh"
                            component={DanhSachCongTrinh}
                        />
                        <Route
                            path="/Dashboard/DSHoanThanhCongTrinh"
                            component={DSHoanThanhCongTrinh}
                        />

                        <Route
                            path="/Dashboard/BangLuong"
                            component={BangLuong}
                        />
                    </Switch>

                    {/* Dark mode */}
                    {/* <label for="dark-mode" className={classes.iconDarkMode}>
                        {theme ? (
                            <Brightness2Icon
                                style={{
                                    color: 'black',
                                    fontSize: '40px',
                                }}
                            />
                        ) : (
                            <WbSunnyIcon
                                style={{
                                    color: 'Orange',
                                    fontSize: '40px',
                                }}
                            />
                        )}
                    </label>
                    <input
                        type="checkbox"
                        id="dark-mode"
                        hidden
                        onChange={(e) => {
                            setTheme(!theme)
                            dispatch({
                                type: DARK_LIGHT_MODE,
                                value: !theme,
                            })
                        }}
                    /> */}
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default Dashboard

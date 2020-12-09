import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'

//import component react material ui
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

//import component react bootstrap
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'

import { useSelector, useDispatch } from 'react-redux'

import { lightTheme, darkTheme } from '../../Theme/theme'

import { DARK_LIGHT_MODE } from '../../reactRedux/ReduxAc'

const HeaderDashboard = React.memo((props) => {
    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    //value state in store
    const imgNhanVien = useSelector((state) => state.imgNV)
    const tenNhanVien = useSelector((state) => state.hoTenNV)

    const isDarkMode = useSelector((state) => state.isDarkMode)

    const [theme, setTheme] = useState(true)

    const dispatch = useDispatch()

    const useStyles = makeStyles((theme) => ({
        styleHeaderContent: {
            minHeight: '60px',
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        formSearch: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            height: '100%',
            padding: '0 20px',
        },
        searchContainer: {
            height: '40px',
            width: '380px',
            borderRadius: '50px',
            marginLeft: '20px',
            border: '1px solid gray',
            overflow: 'hidden',
        },
        searchIcon: {
            fontSize: '26px',
            height: '100%',
            cursor: 'pointer',
            color: 'gray',
        },
        inputSearch: {
            border: 'none',
            outline: 'none',
            height: '100%',
            width: '100%',
            fontSize: '13px',
            fontWeight: '600',
            color: isDarkMode ? lightTheme.text : darkTheme.text,
            backgroundColor: isDarkMode ? lightTheme.body : darkTheme.body,
        },
        Dropdown: {
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
        },
        userAccount: {
            display: 'flex',
            justifySelf: 'flex-end',
        },

        DropdownToggle: {
            color: isDarkMode ? lightTheme.text : darkTheme.text,
            fontSize: '15px',
            fontWeight: '600',
            '&:hover': {
                color: isDarkMode ? lightTheme.text : darkTheme.text,
            },
        },
        MenuIcon: {
            display: 'none',
            cursor: 'pointer',
        },
        PaperHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: '0',
            backgroundColor: isDarkMode ? lightTheme.body : darkTheme.body,
        },
        HomeWorkIcon: {
            fontSize: '40px',
        },
        itemDropdown: {
            backgroundColor: isDarkMode ? 'white' : darkTheme.body,
            color: isDarkMode ? lightTheme.text : darkTheme.text,
        },
        iconDarkMode: {
            borderRadius: '50%',
            display: 'flex',
            width: '45px',
            height: '45px',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '40px',
            fontSize: '50px',
            cursor: 'pointer',
            zIndex: '1',
            transition: 'all 0.2s linear',

            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
        },
    }))

    const classes = useStyles()

    return (
        <Paper elevation={3} className={classes.PaperHeader}>
            <Container className={classes.styleHeaderContent} fluid="md">
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Link to="/Dashboard">
                        <HomeWorkIcon className={classes.HomeWorkIcon} />
                    </Link>

                    <div variant="outlined" className={classes.searchContainer}>
                        <form className={classes.formSearch}>
                            <input
                                type="text"
                                placeholder="Tìm Kiếm..."
                                className={classes.inputSearch}
                            />
                            <SearchIcon className={classes.searchIcon} />
                        </form>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Dark mode */}
                    <label for="dark-mode" className={classes.iconDarkMode}>
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
                    />
                    <div className={classes.userAccount}>
                        <img
                            src={
                                imgNhanVien
                                    ? imgNhanVien
                                    : data_info_person.Avatar
                            }
                            style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                marginRight: '5px',
                                objectFit: 'cover',
                                // backgroundColor: 'white',
                            }}
                        />
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="none"
                                id="dropdown-basic"
                                className={classes.DropdownToggle}
                            >
                                {tenNhanVien
                                    ? tenNhanVien
                                    : data_info_person.HoTen}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href="#/Dashboard/ChiTietNhanVien"
                                    className={classes.itemDropdown}
                                >
                                    Thông Tin Cá Nhân
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/Changepassword"
                                    className={classes.itemDropdown}
                                >
                                    Đổi Mật Khẩu
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/"
                                    onClick={() => {
                                        console.log('đăng xuất')
                                        sessionStorage.removeItem('info')
                                        sessionStorage.removeItem('token')
                                    }}
                                    className={classes.itemDropdown}
                                >
                                    Đăng Xuất
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <MenuIcon className={classes.MenuIcon} />
                </div>
            </Container>
        </Paper>
    )
})

export default HeaderDashboard

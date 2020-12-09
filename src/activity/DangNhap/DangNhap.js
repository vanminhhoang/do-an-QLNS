import React, { useState, useEffect } from 'react'
import '../FormStyle/css/FormStyle.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

//import components react bootstrap
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import { makeStyles } from '@material-ui/core/styles'

// import components
import TitleForm from '../../component/TitleForm/TitleForm'
import InputText from '../../component/InputText/InputText'
import ButtonForm from '../../component/ButtonForm/ButtonForm'
import TextForm from '../../component/TextForm/TextForm'
import ModalWL from '../../component/Modal/ModalWL'

var srcImg = [
    require('../../resource/HinhAnh/huongDan.jpg'),
    // require('../../resource/HinhAnh/huongDan.jpg'),
]

const useStyles = makeStyles((theme) => ({
    tutorial: {
        width: '100%',
        cursor: 'pointer',
        color: 'gray',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '180px',
        color: '#04c3c3',

        '&:hover': {
            color: '#33aef5',
        },
    },
}))

function Login() {
    const styleFlex = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 0,
    }

    const [inputContentText, setInputContentNumber] = useState()
    const [inputContentPassword, setInputContentPassword] = useState()
    const [showMessLogin, setShowMessLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        // Nếu đăng nhập rồi không cho quay lại trang login
        if (sessionStorage.getItem('info')) {
            var host = window.location.href
            window.location.href = host.concat('Dashboard')
            return
        }
    }, [])

    return (
        <div className="container">
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: '30',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <div></div>
            )}
            <div className="form">
                <TitleForm title="QUẢN LÍ LAO ĐỘNG" />
                {showMessLogin ? (
                    <div></div>
                ) : (
                    <Alert
                        variant="danger"
                        onClose={() => setShowMessLogin(true)}
                        dismissible
                    >
                        Sai Tài Khoản Hoặc Mật Khẩu, Vui Lòng Nhập Lại!
                    </Alert>
                )}
                <form className="form-content">
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setInputContentNumber}
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        setInputContent={setInputContentPassword}
                    />
                    <TextForm
                        text="Forgot"
                        text_link="Username / Password?"
                        style={styleFlex}
                        link="/ForgotPassword"
                    />
                    <ButtonForm
                        btnText="Đăng Nhập"
                        link="/Dashboard"
                        feature="login"
                        loading={setLoading}
                        setIsLogin={setShowMessLogin}
                        inputSDT={inputContentText}
                        inputPass={inputContentPassword}
                    />
                </form>
                <div className={classes.tutorial}>
                    <p
                        onClick={() => {
                            setShow(true)
                        }}
                    >
                        Hướng dẫn sử dụng
                    </p>
                </div>
            </div>

            <ModalWL
                show={show}
                setShow={setShow}
                header={'Hướng dẫn sử dụng'}
                srcImg={srcImg}
                heightImg="450px"
                widthImg="100%"
            />
        </div>
    )
}

export default Login

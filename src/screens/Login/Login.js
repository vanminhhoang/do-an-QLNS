import React, { useState } from 'react'
import '../FormStyle/css/FormStyle.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

//import components react bootstrap
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import { makeStyles } from '@material-ui/core/styles'

// import components
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'
import TextForm from '../../resource/TextForm/TextForm'
import ModalWL from '../../resource/Modal/ModalWL'

var srcImg = [
    require('../../assets/Img/tutorialDashboard.jpg'),
    // require('../../assets/Img/tutorialDashboard.jpg'),
]

const useStyles = makeStyles((theme) => ({
    tutorial: {
        width: '100%',
        cursor: 'pointer',
        color: 'gray',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '180px',

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
                <TitleForm title="Sign In" />
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
                        btnText="SIGN IN"
                        link="/Dashboard"
                        feature="login"
                        loading={setLoading}
                        setIsLogin={setShowMessLogin}
                        inputSDT={inputContentText}
                        inputPass={inputContentPassword}
                    />
                </form>
                <div className={classes.tutorial}>
                    <HelpOutlineIcon
                        onClick={() => {
                            setShow(true)
                        }}
                        style={{
                            marginRight: '35px',
                            fontSize: '26px',
                        }}
                    >
                        Hướng dẫn sử dụng
                    </HelpOutlineIcon>
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

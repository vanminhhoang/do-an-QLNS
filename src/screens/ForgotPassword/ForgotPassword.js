import React, { useState } from 'react'
import '../FormStyle/css/FormStyle.css'
import './css/ForgotPassword.css'

//import componenet
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'
import TextForm from '../../resource/TextForm/TextForm'

// import componenet react material ui
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Spinner from 'react-bootstrap/Spinner'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    iconLoad: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
    },
}))

function ForgotPassword() {
    const style = {
        flexDirection: 'row',
        paddingTop: 0,
    }

    const [sdt, setSdt] = useState()
    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')

    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    return (
        <div className="container">
            {loading ? (
                <div className={classes.iconLoad}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <div></div>
            )}
            <Snackbar
                open={showMess}
                autoHideDuration={3000}
                onClose={() => {
                    setShowMess(false)
                }}
            >
                <Alert
                    onClose={() => {
                        setShowMess(false)
                    }}
                    severity="error"
                >
                    {textMess}
                </Alert>
            </Snackbar>

            <div className="form">
                <TitleForm title="Forgot your password" />
                <div class="info">
                    <p>
                        Enter number below and we will send you reset
                        instructions!
                    </p>
                </div>
                <form className="form-content">
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setSdt}
                    />
                    <ButtonForm
                        btnText="Get New Password"
                        link="/ResetPassword"
                        feature="ResetPass"
                        sdtReset={sdt}
                        setShowMess={setShowMess}
                        setTextMess={setTextMess}
                        setLoading={setLoading}
                    />
                    <TextForm
                        text="Remembered?"
                        text_link="Sign In"
                        style={style}
                        link="/"
                    />
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword

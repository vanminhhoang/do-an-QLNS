import React, { useRef, useState } from 'react'

// import components
import TitleForm from '../../resource/TitleForm/TitleForm'
import InputText from '../../resource/InputText/InputText'
import ButtonForm from '../../resource/ButtonForm/ButtonForm'
import TextForm from '../../resource/TextForm/TextForm'

//import icon material
import Spinner from 'react-bootstrap/Spinner'

import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles((theme) => ({
    iconLoad: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '15',
    },
}))

function ChangePassword() {
    const styleFlex = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 0,
    }

    const [pass, setPass] = useState()
    const [newPass, setNewPass] = useState()
    const [newPassAgain, setNewPassAgain] = useState()

    const [loading, setLoading] = useState(false)

    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')

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
                <TitleForm title="Change Password" />
                <form className="form-content">
                    <InputText
                        type="password"
                        placeholder="Nhập mật khẩu củ"
                        setInputContent={setPass}
                    />
                    <InputText
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        setInputContent={setNewPass}
                    />
                    <InputText
                        type="password"
                        placeholder="Xác nhận lại mật khẩu"
                        setInputContent={setNewPassAgain}
                    />

                    <ButtonForm
                        btnText="Lưu"
                        link="/Dashboard"
                        feature="changePassword"
                        pass={pass}
                        newPass={newPass}
                        newPassAgain={newPassAgain}
                        setLoading={setLoading}
                        setShowMess={setShowMess}
                        setTextMess={setTextMess}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword

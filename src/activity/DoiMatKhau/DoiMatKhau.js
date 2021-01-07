import React, { useRef, useState } from 'react'

// import components
import TitleForm from '../../component/TitleForm/TitleForm'
import InputText from '../../component/InputText/InputText'
import ButtonForm from '../../component/ButtonForm/ButtonForm'
import TextForm from '../../component/TextForm/TextForm'

import { Link, useHistory } from 'react-router-dom'

//import icon material
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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
    const history = useHistory()

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
                    <Button
                        variant="outline-secondary"
                        style={{
                            width: '100px',
                            alignSelf: 'center',
                            marginTop: '100px',
                            fontWeight: '600',
                        }}
                        onClick={() => {
                            history.push('/Dashboard')
                        }}
                    >
                        Quay Lại
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword

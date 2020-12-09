import React, { useState } from 'react'
import '../FormStyle/css/FormStyle.css'

//import componenet
import TitleForm from '../../component/TitleForm/TitleForm'
import InputText from '../../component/InputText/InputText'
import ButtonForm from '../../component/ButtonForm/ButtonForm'

function ResetPassword() {
    const [inputContentNewPass, setInputContentNewPass] = useState()
    const [inputContentNewPassCo, setInputContentNewPassCo] = useState()

    return (
        <div className="container">
            <div className="form">
                <TitleForm title="Reset Your Password" />
                <form className="form-content">
                    <InputText
                        type="password"
                        placeholder="New Password"
                        setInputContent={setInputContentNewPass}
                    />
                    <InputText
                        type="password"
                        placeholder="Confirm Password"
                        setInputContent={setInputContentNewPassCo}
                    />
                    <ButtonForm
                        btnText="Reset Password"
                        link="/"
                        inputNewPass={inputContentNewPass}
                        inputNewPassCo={inputContentNewPassCo}
                    />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword

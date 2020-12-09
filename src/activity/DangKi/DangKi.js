import React, { useState } from 'react'
import '../FormStyle/css/FormStyle.css'
import '../../resource/ButtonForm/css/ButtonForm.css'

//import componenet
import TitleForm from '../../component/TitleForm/TitleForm'
import InputText from '../../component/InputText/InputText'
import TextForm from '../../component/TextForm/TextForm'
import ButtonForm from '../../component/ButtonForm/ButtonForm'

//import component react material-ui

function Logup() {
    const [inputContentUsername, setInputContentUsername] = useState()
    const [inputContentHoTen, setInputContentHoTen] = useState()

    return (
        <div className="form">
            <TitleForm title="Sign Up" />
            <form className="form-content">
                <InputText
                    type="number"
                    placeholder="Số điện thoại"
                    setInputContent={setInputContentUsername}
                />
                <InputText
                    placeholder="Họ và tên"
                    setInputContent={setInputContentHoTen}
                />
                <button
                    className="btn-click"
                    onClick={() => {
                        console.log('Tao tai khoan cho nhan vien')
                    }}
                >
                    Tạo tài khoản
                </button>
            </form>
        </div>
    )
}

export default Logup

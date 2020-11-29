import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './css/ButtonForm.css'

import { GET_INFO_NHANVIEN } from '../../redux/Action'

//import func valid
import {
    validatedPhone,
    validatedPassword,
    validatedText,
} from '../../validated/validated'

function ButtonForm(props) {
    const URL_API = 'https://qlnscloud.herokuapp.com/account/login'
    const [disableButton, setDisableButton] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const URL_UPDATE_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account/CapNhatThongTin?token='

    const URL_GETALL_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account/allNhanVien?token='

    const TOKEN = sessionStorage.getItem('token')
    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    function saveTokenToSessionStorage(token) {
        //Check browser support
        if (typeof Storage !== 'undefined') {
            sessionStorage.setItem('token', token)
        } else {
            console.log('No Web Storage support')
        }
    }

    function saveInfoPersonToSessionStorage(data) {
        //Check browser support
        if (typeof Storage !== 'undefined') {
            sessionStorage.setItem('info', JSON.stringify(data))
        } else {
            console.log('No Web Storage support')
        }
    }

    function login() {
        setDisableButton(true)
        props.loading(true)
        if (window.fetch) {
            fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    SDT: props.inputSDT,
                    Pass: props.inputPass,
                }),
            })
                .then((response) => {
                    return response.json()
                })
                .then(async (result) => {
                    if (result.success) {
                        await saveTokenToSessionStorage(result.token)
                        await saveInfoPersonToSessionStorage(result.data)
                        await dispatch({
                            type: GET_INFO_NHANVIEN,
                            value: {
                                imgDefaultStore: result.data.Avatar,
                                nameDefaultStore: result.data.HoTen,
                            },
                        })
                        history.push(props.link)
                    } else {
                        props.setIsLogin(false)
                    }
                    props.loading(false)
                })
                .catch((error) => {
                    console.log('Lỗi', error)
                    props.loading(false)
                })

            setDisableButton(false)
        } else {
            console.log('Fetch not found')
        }
    }

    function changePassword() {
        props.setLoading(true)

        if (props.pass !== data_info_person.Pass) {
            props.setShowMess(true)
            props.setTextMess('Mật khẩu củ không đúng')
            props.setLoading(false)
            return
        }

        if (props.newPass !== props.newPassAgain) {
            props.setShowMess(true)
            props.setTextMess('Nhập lại mật khẩu không đúng')
            props.setLoading(false)
            return
        }

        if (window.fetch) {
            const itemBody = {
                MaNV: data_info_person.MaNV,
                MaPB: data_info_person.MaPB,
                MaCV: data_info_person.MaNV,
                BaoHiem: data_info_person.BaoHiem,
                LuongCoBan: data_info_person.LuongCoBan,
                TypeNV: data_info_person.TypeNV,

                Pass: props.newPass ? props.newPass : data_info_person.Pass,

                SDT: data_info_person.SDT,
                HoTen: data_info_person.HoTen,
                Avatar: data_info_person.Avatar,
                NgaySinh: data_info_person.NgaySinh,
                GioiTinh: data_info_person.GioiTinh,
                DiaChi: data_info_person.DiaChi,
            }

            fetch(URL_UPDATE_NHANVIEN + TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemBody),
            })
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result)
                    if (result.success) {
                        sessionStorage.setItem(
                            'info',
                            JSON.stringify(result.data)
                        )
                        props.setLoading(false)
                        history.push(props.link)
                    } else {
                        props.setShowMess(true)
                        props.setTextMess('Đổi mật khẩu không thành công')
                    }
                })
                .catch((error) => {
                    props.setLoading(false)
                    console.log('Lỗi fech', error)
                })
        } else {
            console.log('fetch not found')
        }
    }

    function resetPass() {
        console.log(props.sdtReset)
        // props.setLoading(true)

        if (window.fetch) {
            fetch(URL_GETALL_NHANVIEN + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result)
                    // if (result.success) {
                    //     props.setLoading(false)
                    //     history.push(props.link)
                    // } else {
                    //     props.setShowMess(true)
                    //     props.setTextMess(result.mess)
                    // }
                })
                .catch((error) => {
                    props.setLoading(false)
                    console.log('Lỗi fetch', error)
                })
        } else {
            console.log('fetch not found')
        }
    }

    return (
        <button
            type="button"
            className="btn-click"
            disabled={disableButton}
            onClick={(e) => {
                switch (props.feature) {
                    case 'login': {
                        if (
                            validatedPhone(props.inputSDT) &&
                            validatedPassword(props.inputPass)
                        ) {
                            login()

                            return
                        }
                        break
                    }

                    case 'changePassword': {
                        if (
                            validatedText(props.pass, 'mật khẩu') &&
                            validatedText(props.newPass, 'mật khẩu mới') &&
                            validatedText(
                                props.newPassAgain,
                                'xác nhận mật khẩu mới'
                            )
                        ) {
                            console.log('red')
                            changePassword()
                            return
                        }
                        break
                    }

                    // case 'ResetPass': {
                    //     // resetPass()
                    //     history.push(props.link)
                    //     return
                    // }
                    default:
                        break
                }
            }}
        >
            {props.btnText}
        </button>
    )
}

export default ButtonForm

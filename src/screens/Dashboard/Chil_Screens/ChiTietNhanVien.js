import { Paper } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { lightTheme, darkTheme } from '../../../darkMode/theme'

import { store } from '../../../redux/Store'
import { UPDATE_NHANVIEN } from '../../../redux/Action'

import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'

function ChiTietNhanVien(props) {
    const data_info_person = JSON.parse(sessionStorage.getItem('info'))
    const URL_API = 'https://qlnscloud.herokuapp.com/truongphong/'
    // const UPDATE_NHANVIEN = 'CapNhatNhanVien'
    const TOKEN = sessionStorage.getItem('token')

    const URL_UPDATE_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account/CapNhatThongTin?token='

    const UPLOAD_IMG =
        'https://qlnscloud.herokuapp.com/account/UploadAvatar?token='

    //Sửa nhân viên
    const [disableInput, setDisableInput] = useState('none')
    const [bgInput, setBgInput] = useState()
    const [hiddenText, setHiddenText] = useState('none')

    const [isFileTypeImg, SetIsFileTypeImg] = useState(true)

    const [loading, setLoading] = useState()

    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')
    const [severityMess, setSeverityMess] = useState('')

    const [showTextFieldDate, setShowTextFieldDate] = useState()

    const [objFile, setObjFile] = useState()

    const [textErrorUpdateImage, setTextErrorUpdateImage] = useState()

    const dispatch = useDispatch()
    const isDarkMode = useSelector((state) => state.isDarkMode)

    //Chứa thông tin nhân viên
    const [imgNhanVien, setImgNhanVien] = useState(data_info_person.Avatar)
    const [valueInputTen, setValueInputTen] = useState(data_info_person.HoTen)
    const [valueInputGT, setValueInputGT] = useState(data_info_person.GioiTinh)
    const [valueInputSDT, setValueInputSDT] = useState(data_info_person.SDT)
    const [valueInputNS, setValueInputNS] = useState(data_info_person.NgaySinh)
    const [valueInputDC, setValueInputDC] = useState(data_info_person.DiaChi)

    const useStyles = makeStyles((theme) => ({
        txtInput: {
            outline: 'none',
            width: '200px',
            paddingLeft: '8px',
            border: 'none',
            fontSize: '17px',
            fontWeight: '600',
            margin: '8px 0',
            pointerEvents: disableInput,
            backgroundColor: isDarkMode ? 'white' : darkTheme.body,
            color: isDarkMode ? lightTheme.text : darkTheme.text,
            borderBottom: bgInput,
        },
        ColItem: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Button: {
            width: '100px',
            margin: '0 4px',
        },
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
        textUploadImg: {
            cursor: 'pointer',
            color: 'blue',
            display: hiddenText,
        },
    }))
    const classes = useStyles()

    async function uploadImg(nameFile) {
        // console.log(objFile)
        // Nếu ko có ảnh nào đc chọn thì bỏ qua
        if (!objFile) {
            return
        }
        // const reader = new FileReader()
        // reader.onload = () => {
        //     // console.log(reader)
        //     var dataURL = reader.result
        //     // console.log(dataURL) //get url img
        //     // setImgNhanVien(dataURL)
        // }

        // try {
        //     reader.readAsDataURL(objFile)
        // } catch (error) {
        //     console.error(error)
        // }

        if (window.fetch) {
            const formData = new FormData()
            formData.append('image', objFile)
            formData.append('filename', nameFile)

            // console.log(formData)

            const fetchUploadImg = await fetch(UPLOAD_IMG + TOKEN, {
                mode: 'no-cors',
                method: 'POST',
                body: formData,
            })
                // .then((response) => {
                //     return response.json()
                // })
                .then(() => {
                    const urlImg =
                        'https://storage.googleapis.com/quanlinhansu/' +
                        objFile.name

                    console.log(urlImg)
                    return urlImg
                })
                .catch((error) => {
                    setTextMess('Upload ảnh thất bại!')
                    setShowMess(true)
                    setSeverityMess('error')

                    console.log('Lỗi', error)
                })

            return fetchUploadImg
        } else {
            console.log('fetch not found')
        }
    }

    function updateInfo(urlImg) {
        var _item = {
            MaNV: data_info_person.MaNV,
            MaPB: data_info_person.MaPB,
            MaCV: data_info_person.MaCV,
            BaoHiem: data_info_person.BaoHiem,
            LuongCoBan: data_info_person.LuongCoBan,
            TypeNV: data_info_person.TypeNV,
            Pass: data_info_person.Pass,

            SDT: valueInputSDT,
            HoTen: valueInputTen,
            Avatar: urlImg ? urlImg : data_info_person.Avatar,
            NgaySinh: valueInputNS,
            GioiTinh: valueInputGT,
            DiaChi: valueInputDC,
        }

        setLoading(true)

        if (window.fetch) {
            fetch(URL_UPDATE_NHANVIEN + TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_item),
            })
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    // console.log('Response ' + JSON.stringify(result))
                    if (result.success) {
                        //Save info in session storage web
                        sessionStorage.setItem(
                            'info',
                            JSON.stringify(result.data)
                        )

                        //truyền action lên store
                        dispatch({
                            type: UPDATE_NHANVIEN,
                            value: {
                                newName: result.data.HoTen,
                                newImg: result.data.Avatar,
                            },
                        })

                        setLoading(false)
                        setShowMess(true)
                        setTextMess('Cập nhật thành công')
                        setSeverityMess('success')
                        return
                    } else {
                        setShowMess(true)
                        setTextMess(result.mess)
                        setSeverityMess('error')
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    setShowMess(true)
                    setTextMess('Cập nhật không thành công, vui lòng thử lại')
                    setSeverityMess('error')
                    console.log('Fetch to false', error)
                })
        } else {
            console.log('fetch not found')
        }
    }

    return (
        <Container
            fluid
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
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
                    severity={severityMess}
                >
                    {textMess}
                </Alert>
            </Snackbar>
            {loading ? (
                <div className={classes.iconLoad}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <div></div>
            )}

            <Paper
                style={{
                    width: '100%',
                    height: '680px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '10px',
                    backgroundColor: isDarkMode ? 'white' : darkTheme.body,
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        borderBottom: '1px solid gray',
                        color: isDarkMode ? lightTheme.text : darkTheme.text,
                        lineHeight: '80px',
                    }}
                >
                    Thông tin cá nhân
                </h1>
                <Row>
                    <Col md={4} className={classes.ColItem}>
                        <img
                            src={imgNhanVien}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                marginBottom: '7px',
                                objectFit: 'cover',
                                backgroundColor: 'white',
                            }}
                        />
                        <label
                            for="chosse_img"
                            className={classes.textUploadImg}
                        >
                            Cập nhật ảnh đại diện
                        </label>

                        {isFileTypeImg ? (
                            ''
                        ) : (
                            <span
                                style={{
                                    color: 'red',
                                    fontSize: '17px',
                                    fontWeight: '600',
                                }}
                            >
                                {textErrorUpdateImage}
                            </span>
                        )}

                        <input
                            id="chosse_img"
                            type="file"
                            hidden
                            onChange={(e) => {
                                var objFile = e.target.files[0]

                                if (objFile) {
                                    const typeInput = objFile.type
                                    if (
                                        typeInput &&
                                        typeInput.indexOf('image') === -1
                                    ) {
                                        setTextErrorUpdateImage(
                                            'Chọn sai định dạng ảnh'
                                        )
                                        /* set 5s ẩn text */
                                        setTimeout(() => {
                                            setTextErrorUpdateImage('')
                                        }, 5000)
                                        SetIsFileTypeImg(false)
                                        return
                                    } else {
                                        if (typeInput == 'image/png') {
                                            setObjFile(objFile)
                                            SetIsFileTypeImg(true)

                                            // console.log(objFile)

                                            const reader = new FileReader()
                                            reader.onload = () => {
                                                var dataURL = reader.result
                                                //console.log(dataURL) //get url img
                                                setImgNhanVien(dataURL)
                                            }

                                            try {
                                                reader.readAsDataURL(
                                                    e.target.files[0]
                                                )
                                            } catch (error) {
                                                console.error(error)
                                            }
                                        } else {
                                            SetIsFileTypeImg(false)
                                            setTextErrorUpdateImage(
                                                'Vui lòng chọn ảnh có đuôi .png'
                                            )
                                            /* set 5s ẩn text */
                                            setTimeout(() => {
                                                setTextErrorUpdateImage('')
                                            }, 5000)
                                            return
                                        }
                                    }
                                }
                            }}
                        />
                    </Col>
                    <Col
                        md={3}
                        className={classes.ColItem}
                        style={{
                            alignItems: 'flex-start',
                            color: '#667580',
                            fontWeight: '600',
                            fontSize: '17px',
                        }}
                    >
                        <div
                            style={{
                                margin: '8px 0',
                            }}
                        >
                            Mã Số:
                            <span
                                style={{
                                    marginLeft: '8px',
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    color: isDarkMode
                                        ? lightTheme.text
                                        : darkTheme.text,
                                }}
                            >
                                {data_info_person.MaNV}
                            </span>
                        </div>
                        <div
                            style={{
                                margin: '8px 0',
                            }}
                        >
                            Mã Phòng Ban:
                            <span
                                style={{
                                    marginLeft: '8px',
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    color: isDarkMode
                                        ? lightTheme.text
                                        : darkTheme.text,
                                }}
                            >
                                {data_info_person.MaPB}
                            </span>
                        </div>
                        <div
                            style={{
                                margin: '8px 0',
                            }}
                        >
                            Mã Chức Vụ:
                            <span
                                style={{
                                    marginLeft: '8px',
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    color: isDarkMode
                                        ? lightTheme.text
                                        : darkTheme.text,
                                }}
                            >
                                {data_info_person.MaCV}
                            </span>
                        </div>
                        <div>
                            Họ Tên:
                            <input
                                value={valueInputTen}
                                type="text"
                                className={classes.txtInput}
                                onChange={(e) => {
                                    setValueInputTen(e.target.value)
                                }}
                            />
                        </div>
                    </Col>
                    <Col
                        md={3}
                        className={classes.ColItem}
                        style={{
                            alignItems: 'flex-start',
                            color: '#667580',
                            fontWeight: '600',
                            fontSize: '17px',
                        }}
                    >
                        <div>
                            Giới Tính:
                            <input
                                value={valueInputGT}
                                type="text"
                                className={classes.txtInput}
                                onChange={(e) => {
                                    setValueInputGT(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            Số Điện Thoại:
                            <input
                                value={valueInputSDT}
                                type="text"
                                className={classes.txtInput}
                                onChange={(e) => {
                                    setValueInputSDT(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            Ngày Sinh:
                            {showTextFieldDate ? (
                                <TextField
                                    id="date"
                                    type="date"
                                    className={classes.txtInput}
                                    style={{
                                        marginTop: '0',
                                    }}
                                    defaultValue={valueInputNS}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        setValueInputNS(e.target.value)
                                    }}
                                />
                            ) : (
                                <input
                                    value={valueInputNS}
                                    type="text"
                                    className={classes.txtInput}
                                />
                            )}
                        </div>
                        <div>
                            Địa Chỉ:
                            <input
                                value={valueInputDC}
                                type="text"
                                className={classes.txtInput}
                                onChange={(e) => {
                                    setValueInputDC(e.target.value)
                                }}
                            />
                        </div>
                    </Col>
                    <Col
                        md={2}
                        className={classes.ColItem}
                        style={{
                            alignItems: 'flex-start',
                            color: '#667580',
                            fontWeight: '600',
                            fontSize: '17px',
                        }}
                    >
                        <div
                            style={{
                                margin: '8px 0',
                            }}
                        >
                            Chức Vụ:
                            <span
                                style={{
                                    marginLeft: '8px',
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    color: isDarkMode
                                        ? lightTheme.text
                                        : darkTheme.text,
                                }}
                            >
                                {data_info_person.TypeNV == 1
                                    ? 'Nhân Viên'
                                    : data_info_person.TypeNV == 2
                                    ? 'Trưởng Phòng'
                                    : ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '200px',
                    }}
                >
                    <Button
                        variant="warning"
                        className={classes.Button}
                        onClick={(e) => {
                            setDisableInput('auto')
                            setBgInput(
                                `0.5px solid ${isDarkMode ? 'black' : 'white'}`
                            )
                            setHiddenText('block')
                            setShowTextFieldDate(true)
                        }}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        variant="success"
                        className={classes.Button}
                        onClick={(e) => {
                            setDisableInput('none')
                            setBgInput('none')
                            setHiddenText('none')

                            setShowTextFieldDate(false)

                            //upload img
                            uploadImg('ABC').then((urlImg) => {
                                // console.log(urlImg)

                                // cho upload ảnh trước -> update thong tin
                                updateInfo(urlImg)
                            })
                        }}
                    >
                        Lưu
                    </Button>
                </div>
            </Paper>
        </Container>
    )
}

export default ChiTietNhanVien

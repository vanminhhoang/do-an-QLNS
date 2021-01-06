import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

//import func valid
import {
    validatedPhone,
    validatedPassword,
    validatedText,
} from '../../../regex/regexValidated'

import InputText from '../../../component/InputText/InputText'
import '../../../component/InputText/css/InputText.css'

//import api
import { pushNotify } from '../../../api/pushNotify'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formSearch: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        height: '100%',
        padding: '0 20px',
    },
    searchContainer: {
        border: '1px solid black',
        height: '50px',
        width: '100%',
        borderRadius: '50px',
    },
    searchIcon: {
        fontSize: '30px',
        height: '100%',
        cursor: 'pointer',
        color: 'gray',
    },
    inputSearch: {
        border: 'none',
        outline: 'none',
        height: '100%',
        width: '100%',
        fontSize: '15px',
        fontWeight: '600',
    },

    itemDialog: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    notNetWok: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        fontSize: '30px',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
}))

var lengthDSNV

function DSNhanVien(props) {
    const classes = useStyles()

    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    const GET_ALL_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account2/allNhanVien'
    const DEL_NHANVIEN =
        'https://qlnscloud.herokuapp.com/truongphong2/XoaNhanVien'
    const TOKEN = sessionStorage.getItem('token')

    const [dataDSNV, setDataDSNV] = useState()

    const URL_UPDATE_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account2/CapNhatThongTin'

    const URL_CREATE_NHANVIEN =
        'https://qlnscloud.herokuapp.com/account2/create'

    const [UITableNhanVien, setUITableNhanVien] = useState()
    const [loading, setloading] = useState()
    const [isNetWork, setIsNetWork] = useState(true)
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [showDialogUpdate, setShowDialogUpdate] = useState(false)
    const [InfoNhanVien, setInfoNhanVien] = useState()
    const [modalShowDialogCreateNV, setModalShowDialogCreateNV] = useState(
        false
    )

    const [loadDSNV, setLoadDSNV] = useState(false)

    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')
    const [severityMess, setSeverityMess] = useState('')

    var history = useHistory()

    function checkNetWork() {
        window.addEventListener('online', () => {
            setIsNetWork(window.navigator.onLine)
            console.log('online')
            return
        })

        window.addEventListener('offline', () => {
            setIsNetWork(window.navigator.onLine)
            console.log('offline')
            return
        })
    }

    function getDanhSachNhanVien() {
        setloading(true)
        if (window.fetch) {
            fetch(GET_ALL_NHANVIEN + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    lengthDSNV = result.data.length
                    setDataDSNV(result.data)
                    RenderUITableNhanVien(result.data)
                    setloading(false)
                    setLoadDSNV(false)
                })
                .catch((error) => {
                    setloading(false)
                    console.error('Fetch to false', error)
                })
        } else {
            console.log('Fetch not found')
        }
    }

    useEffect(() => {
        checkNetWork()
        getDanhSachNhanVien()
    }, [loadDSNV])

    var stt = 0
    function ItemNV(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.HoTen}</TableCell>
                <TableCell>{props.GioiTinh}</TableCell>
                <TableCell>{props.NgaySinh}</TableCell>
                <TableCell>{props.DiaChi}</TableCell>
                {data_info_person.TypeNV == 2 ? (
                    <TableCell
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="outline-danger"
                            style={{
                                width: '100px',
                                fontSize: '17px',
                            }}
                            onClick={() => {
                                setShowDialogUpdate(true)
                                setInfoNhanVien(props)
                            }}
                        >
                            Cập nhật
                        </Button>
                        <Button
                            variant="danger"
                            style={{
                                marginLeft: '5px',
                                width: '100px',
                                fontSize: '17px',
                            }}
                            onClick={() => {
                                console.log('Xóa nhân viên')
                                setInfoNhanVien(props)
                                setShowDialogDelete(true)
                            }}
                        >
                            Xóa
                        </Button>
                    </TableCell>
                ) : (
                    <div></div>
                )}
            </TableRow>
        )
    }

    function RenderUITableNhanVien(data) {
        setUITableNhanVien(
            data.map((e) => {
                return ItemNV(e)
            })
        )
    }

    function ModalDialogUpdateNV() {
        const nhanVien = { ...InfoNhanVien }

        const [sdt, setSdt] = useState()
        const [hoTen, setHoTen] = useState()
        const [pass, setPass] = useState()
        const [ngaySinh, setNgaySinh] = useState()
        const [gioiTinh, setGioiTinh] = useState()
        const [diaChi, setDiaChi] = useState()

        const itemBodyRequest = {
            MaNV: nhanVien.MaNV,
            MaPB: nhanVien.MaPB,
            MaCV: nhanVien.MaCV,
            Avatar: nhanVien.Avatar,
            BaoHiem: nhanVien.BaoHiem,
            LuongCoBan: nhanVien.LuongCoBan,
            TypeNV: data_info_person.TypeNV,

            SDT: sdt ? sdt : nhanVien.SDT,
            HoTen: hoTen ? hoTen : nhanVien.HoTen,
            Pass: pass ? pass : nhanVien.Pass,
            NgaySinh: ngaySinh ? ngaySinh : nhanVien.NgaySinh,
            GioiTinh: gioiTinh ? gioiTinh : nhanVien.GioiTinh,
            DiaChi: diaChi ? diaChi : nhanVien.DiaChi,
        }

        function updateNV() {
            fetch(URL_UPDATE_NHANVIEN + '?token=' + TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemBodyRequest),
            })
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result)
                    if (result.success) {
                        if (result.data.MaNV === data_info_person.MaNV) {
                            sessionStorage.setItem(
                                'info',
                                JSON.stringify(result.data)
                            )
                        }

                        setLoadDSNV(true)
                        setShowMess(true)
                        setTextMess('Cập nhật nhân viên thành công!')
                        setSeverityMess('success')

                        //Thêm thông báo cập nhật nhân viên thành công
                        const objDate = new Date()
                        const bodyNoti = {
                            NoiDung: `Nhân viên ${nhanVien.HoTen} vừa được cập nhật thông tin`,
                            DateAdding: `${objDate.getFullYear()}-${
                                objDate.getMonth() + 1
                            }-${objDate.getDate()}`,
                            TimeAt: `${objDate.getHours()}:${objDate.getMinutes()}`,
                        }
                        pushNotify(bodyNoti, TOKEN)
                        return
                    } else {
                        setShowMess(true)
                        setTextMess(result.mess)
                        setSeverityMess('error')
                        return
                    }
                })
                .catch((error) => {
                    console.log('Lỗi', error)
                })
        }

        return (
            <Modal
                show={showDialogUpdate}
                onHide={() => setShowDialogUpdate(false)}
            >
                <Modal.Header closeButton>
                    <h5>Cập nhật nhân viên</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setSdt}
                    />
                    <InputText
                        placeholder="Họ tên"
                        setInputContent={setHoTen}
                    />
                    <InputText
                        type="password"
                        placeholder="Mật khẩu"
                        setInputContent={setPass}
                    />
                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày sinh"
                            type="date"
                            className="input-content"
                            defaultValue={nhanVien.NgaySinh}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setNgaySinh(e.target.value)
                            }}
                        />
                    </div>
                    <InputText
                        placeholder="Giới tính"
                        setInputContent={setGioiTinh}
                    />
                    <InputText
                        placeholder="Địa chỉ"
                        setInputContent={setDiaChi}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDialogUpdate(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateNV()
                            setShowDialogUpdate(false)
                            return
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogDelNV() {
        const nhanVien = { ...InfoNhanVien }
        const [sdt, setSdt] = useState()
        const [pass, setPass] = useState()

        function delNhanVien() {
            console.log(
                JSON.stringify({
                    MaNV: nhanVien.MaNV,
                    SDT: sdt,
                    Pass: pass,
                })
            )
            console.log(TOKEN)
            fetch(DEL_NHANVIEN + '?token=' + TOKEN, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MaNV: nhanVien.MaNV,
                    SDT: sdt,
                    Pass: pass,
                }),
            })
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result)
                    if (result.success) {
                        setLoadDSNV(true)
                        setShowMess(true)
                        setTextMess('Xóa nhân viên thành công!')
                        setSeverityMess('success')

                        //Thêm thông báo xóa nv thành công
                        const objDate = new Date()
                        const bodyNoti = {
                            NoiDung: `Nhân viên ${nhanVien.HoTen} vừa được xóa`,
                            DateAdding: `${objDate.getFullYear()}-${
                                objDate.getMonth() + 1
                            }-${objDate.getDate()}`,
                            TimeAt: `${objDate.getHours()}:${objDate.getMinutes()}`,
                        }
                        pushNotify(bodyNoti, TOKEN)
                        return
                    } else {
                        setShowMess(true)
                        setTextMess('Xóa nhân viên thất bại!')
                        setSeverityMess('error')
                        return
                    }
                })
                .catch((error) => {
                    console.log('Lỗi', error)
                })
        }

        function ItemDialog(props) {
            return (
                <div className={classes.itemDialog}>
                    <span>{props.label}</span>
                    <span style={{ fontWeight: '600', color: 'gray' }}>
                        {props.data}
                    </span>
                </div>
            )
        }

        return (
            <Modal
                show={showDialogDelete}
                onHide={() => setShowDialogDelete(false)}
            >
                <Modal.Header closeButton>
                    <h5>Bạn có muốn xóa nhân viên này ?</h5>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            padding: '0 30px',
                        }}
                    >
                        <ItemDialog
                            label="Tên nhân viên: "
                            data={nhanVien.HoTen}
                        />
                        <ItemDialog
                            label="Giới tính: "
                            data={nhanVien.GioiTinh}
                        />
                        <ItemDialog label="Địa chỉ: " data={nhanVien.DiaChi} />
                        <ItemDialog
                            label="Ngày sinh: "
                            data={nhanVien.NgaySinh}
                        />
                    </div>
                    <hr></hr>

                    <div>
                        <h5>Yêu cầu nhập vào số điện thoại và mật khẩu</h5>
                    </div>
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setSdt}
                    />
                    <InputText
                        type="password"
                        placeholder="Mật khẩu"
                        setInputContent={setPass}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDialogDelete(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (
                                validatedPhone(sdt) &&
                                validatedPassword(pass)
                            ) {
                                delNhanVien()
                                setShowDialogDelete(false)
                                return
                            }
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogCreateNV() {
        const [phone, setPhone] = useState()
        const [hoTen, setHoTen] = useState()

        function createNhanVien() {
            if (window.fetch) {
                fetch(URL_CREATE_NHANVIEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        SDT: phone,
                        HoTen: hoTen,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        console.log(result)
                        if (result.success) {
                            setLoadDSNV(true)
                            setShowMess(true)
                            setTextMess('Thêm nhân viên thành công!')
                            setSeverityMess('success')

                            //Thêm thông báo thêm 1 nv thành công
                            var objDate = new Date()
                            const bodyNoti = {
                                NoiDung: '1 nhân viên vừa được tạo',
                                DateAdding: `${objDate.getFullYear()}-${
                                    objDate.getMonth() + 1
                                }-${objDate.getDate()}`,
                                TimeAt: `${objDate.getHours()}:${objDate.getMinutes()}`,
                            }
                            pushNotify(bodyNoti, TOKEN)

                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                            return
                        }
                    })
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogCreateNV}
                onHide={() => setModalShowDialogCreateNV(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h3
                        style={{
                            color: 'black',
                        }}
                    >
                        Thêm Nhân Viên
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setPhone}
                    />
                    <InputText
                        placeholder="Họ và tên"
                        setInputContent={setHoTen}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setModalShowDialogCreateNV(false)
                        }}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            //check sdt đúng định dạng
                            if (
                                validatedPhone(phone) &&
                                validatedText(hoTen, 'họ và tên')
                            ) {
                                createNhanVien()
                                setModalShowDialogCreateNV(false)
                                return
                            }
                        }}
                    >
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Container fluid>
            <ModalDialogDelNV />
            <ModalDialogCreateNV />
            <ModalDialogUpdateNV />
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '20px 0',
                }}
            >
                <h1 style={{ width: '100%', textAlign: 'center' }}>
                    Danh Sách Nhân Viên
                </h1>
                {data_info_person.TypeNV == 2 ? (
                    <Button
                        style={{
                            width: '200px',
                            height: '50px',
                            alignSelf: 'flex-end',
                        }}
                        onClick={() => {
                            setModalShowDialogCreateNV(true)
                        }}
                    >
                        Thêm Nhân Viên
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
            <Paper
                style={{
                    width: '100%',
                }}
            >
                {loading ? (
                    <div className={classes.iconLoad}>
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div></div>
                )}
                {isNetWork ? (
                    <div>
                        <div className={classes.searchContainer}>
                            <form className={classes.formSearch}>
                                <input
                                    type="text"
                                    placeholder="Tìm Kiếm Nhân Viên"
                                    className={classes.inputSearch}
                                    onChange={(event) => {
                                        const textSearch = event.target.value.toLowerCase()
                                        const regex = new RegExp(textSearch)

                                        setUITableNhanVien(
                                            dataDSNV.map((e) => {
                                                if (
                                                    regex.test(
                                                        e.HoTen.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.GioiTinh.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.NgaySinh.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.DiaChi.toLowerCase()
                                                    )
                                                ) {
                                                    return ItemNV(e)
                                                }
                                            })
                                        )
                                    }}
                                />
                                <SearchIcon className={classes.searchIcon} />
                            </form>
                        </div>
                        <TableContainer
                            style={{
                                maxHeight: '65vh',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên Nhân Viên</TableCell>
                                        <TableCell>Giới Tính</TableCell>
                                        <TableCell>Ngày Sinh</TableCell>
                                        <TableCell>Địa Chỉ</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{UITableNhanVien}</TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <div className={classes.notNetWok}>
                        Không có mạng, vui lòng thử lại
                    </div>
                )}
            </Paper>
        </Container>
    )
}

export default DSNhanVien
export { lengthDSNV }

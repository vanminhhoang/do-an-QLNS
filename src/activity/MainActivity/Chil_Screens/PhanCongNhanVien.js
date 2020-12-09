import React, { useEffect, useState } from 'react'

import InputText from '../../../component/InputText/InputText'
import '../../../component/InputText/css/InputText.css'

//import func valid
import {
    validatedPhone,
    validatedPassword,
    validatedText,
} from '../../../regex/regexValidated'

//import api
import { pushNotify } from '../../../api/pushNotify'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { Paper } from '@material-ui/core'

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
        backgroundColor: 'white',
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
        fontSize: '16px',
        fontWeight: '600',
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
    itemDialog: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

function PhanCongNhanVien(props) {
    const URL_API = 'https://qlnscloud.herokuapp.com/ngaycong2/'
    const GET_DSNC = 'ToanBoNgayCong'
    const UPDATE_NC = 'CapNhatNgayCong'
    const ADD_NGAYCONG = 'ThemNgayCongCuaNhanVien'
    const DEL_NGAYCONG = 'XoaNgayCongNhanVien'
    const TOKEN = sessionStorage.getItem('token')

    const [thongTinCT, setThongTinCT] = useState()
    const [valueRating, setValueRating] = useState()
    const [thongTinNV, setThongTinNV] = useState()

    const [allNgayCong, setAllNgayCong] = useState()

    const [UITableNgayCong, setUITableNhanVien] = useState()
    const [loadDSNC, setLoadDSNC] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')
    const [severityMess, setSeverityMess] = useState('')

    const [isNetWork, setIsNetWork] = useState(true)

    const [modalShowDialogAddNC, setModalShowDialogAddNC] = useState(false)
    const [modalShowDialogDelNC, setModalShowDialogDelNC] = useState(false)
    const [modalShowDialogUpdateNC, setModalShowDialogUpdateNC] = useState(
        false
    )

    const object_nhanVien = JSON.parse(sessionStorage.getItem('info'))

    const classes = useStyles()

    function getDanhSachNgayCong() {
        setLoading(true)
        if (window.fetch) {
            fetch(URL_API + GET_DSNC + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    RenderUITableNhanVien(result.data)
                    setAllNgayCong(result.data)
                    setLoading(false)
                    setLoadDSNC(false)
                })
                .catch((error) => {
                    setLoading(false)
                    console.log('Lỗi', error)
                })
        } else {
            console.log('fetch not found')
        }
    }

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

    useEffect(() => {
        checkNetWork()
        getDanhSachNgayCong()
    }, [loadDSNC])

    function RenderUITableNhanVien(data) {
        setUITableNhanVien(
            data.map((e) => {
                return ItemNhanVien(e)
            })
        )
    }

    var stt = 0
    function ItemNhanVien(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.HoTen}</TableCell>
                <TableCell>{props.TenCT}</TableCell>
                <TableCell>{props.DiaDiem}</TableCell>
                <TableCell>{props.DateWorking}</TableCell>
                {/* <TableCell>
                    <Rating
                        // name="simple-controlled"
                        value={props.DanhGia}
                        readOnly
                        // onChange={(event, newValue) => {
                        //     setValueRating(event.target.value)
                        //     console.log(valueRating)
                        // }}
                    />
                </TableCell> */}
                {object_nhanVien.TypeNV == 2 ? (
                    <TableCell
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="outline-danger"
                            style={{
                                width: '170px',
                                fontSize: '16px',
                            }}
                            onClick={() => {
                                setThongTinCT(props)
                                setModalShowDialogAddNC(true)
                                setThongTinNV(props)
                            }}
                        >
                            Thêm Lịch Làm
                        </Button>
                    </TableCell>
                ) : (
                    <div></div>
                )}

                {/* <Button
                        variant="danger"
                        style={{
                            marginLeft: '5px',
                            width: '100px',
                            fontSize: '17px',
                        }}
                        onClick={() => {
                            console.log('xoa ngay cong')
                            setThongTinCT(props)
                            setModalShowDialogDelNC(true)
                        }}
                    >
                        Xóa
                    </Button> */}
            </TableRow>
        )
    }

    function ModalDialogUpdateSLNgayCong() {
        const objCT = { ...thongTinCT }
        const [newSLNgayCong, setNewSLNgayCong] = useState()

        function updateSLNgayCong() {
            if (window.fetch) {
                fetch(URL_API + UPDATE_NC + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaNV: objCT.MaNV,
                        SLNgayCong: newSLNgayCong,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess(
                                'Cập nhật số lượng ngày công thành công!'
                            )
                            setSeverityMess('success')
                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                            return
                        }
                    })
                    .catch((error) => console.log('Lỗi', error))
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogUpdateNC}
                onHide={() => setModalShowDialogUpdateNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h5>Cập nhật số lượng ngày công nhân viên</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Mã Công Trình"
                        setInputContent={setNewSLNgayCong}
                    />
                    <InputText
                        placeholder="Ngày Làm Việc"
                        setInputContent={setNewSLNgayCong}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalShowDialogUpdateNC(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateSLNgayCong()
                            setModalShowDialogUpdateNC(false)
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogDelNgayCong() {
        const objNC = { ...thongTinCT }
        const [sdt, setSdt] = useState()
        const [pass, setPass] = useState()

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

        function delNgayCong() {
            if (window.fetch) {
                fetch(URL_API + DEL_NGAYCONG + '?token=' + TOKEN, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaNV: objNC.MaNV,
                        SDT: sdt,
                        Pass: pass,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess('Xóa ngày công thành công!')
                            setSeverityMess('success')
                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                        }
                    })
                    .catch((error) => {
                        console.log('Lỗi', error)
                    })
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogDelNC}
                onHide={() => setModalShowDialogDelNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Bạn có muốn xóa ngày công này ?</h5>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            padding: '0 30px',
                        }}
                    >
                        <ItemDialog label="Mã nhân viên: " data={objNC.MaNV} />
                        <ItemDialog label="Mã ngày công: " data={objNC.MaNC} />
                        <ItemDialog
                            label="Số lượng ngày công: "
                            data={objNC.SLNgayCong}
                        />
                    </div>
                    <hr />
                    <h5>Nhập tài khoản xác nhận</h5>
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
                        onClick={() => setModalShowDialogDelNC(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (
                                validatedText(sdt, 'số điện thoại') &&
                                validatedText(pass, 'mật khẩu')
                            ) {
                                delNgayCong()
                                setModalShowDialogDelNC(false)
                            }
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogAddLichLam() {
        const [maNV, setMaNV] = useState()
        const [SLNgayCong, setSLNgayCong] = useState()
        const [dateWorking, setDateWorking] = useState()
        const [nhanXet, setNhanXet] = useState()
        const [diemDanh, setDiemDanh] = useState(false)

        const [danhGia, setDanhGia] = useState(1)

        const [maCT, setMaCT] = useState()
        const [tenCT, setTenCT] = useState()
        const [diaDiemCT, setDiaDiemCT] = useState()
        const [ngayLam, setNgayLam] = useState()

        const thongTinNhanVien = { ...thongTinNV }

        function addLichLam() {
            const itemRequestBody = {
                MaNV: thongTinNhanVien.MaNV,
                HoTen: thongTinNhanVien.HoTen,
                MaCT: maCT,
                TenCT: tenCT,
                DiaDiem: diaDiemCT,
                DateWorking: ngayLam,
            }

            //kiểm tra ngày làm có lơn hơn ngày hiện tại
            if (Date.now() > new Date(ngayLam).getTime()) {
                setShowMess(true)
                setTextMess(
                    'Thêm lịch làm thất bại, ngày làm phải lớn hơn ngày hiện tại!'
                )
                setSeverityMess('error')
                return
            }

            if (window.fetch) {
                fetch(URL_API + ADD_NGAYCONG + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemRequestBody),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        console.log(result)
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess('Thêm lịch làm thành công!')
                            setSeverityMess('success')

                            //Thêm thông báo thêm lịch làm nv thành công
                            const objDate = new Date()
                            const bodyNoti = {
                                NoiDung: `Nhân viên ${thongTinNhanVien.HoTen} vừa được phân công việc làm`,
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
                    .catch((error) => console.log('Lỗi', error))
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogAddNC}
                onHide={() => setModalShowDialogAddNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h4
                        style={{
                            color: 'black',
                        }}
                    >
                        Thêm Lịch Làm
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Mã công trình"
                        setInputContent={setMaCT}
                    />
                    <InputText
                        placeholder="Tên công trình"
                        setInputContent={setTenCT}
                    />
                    <InputText
                        placeholder="Địa điểm"
                        setInputContent={setDiaDiemCT}
                    />
                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày làm việc"
                            type="date"
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setNgayLam(e.target.value)
                            }}
                        />
                    </div>

                    {/* <h6>Điểm danh</h6>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <input
                                type="radio"
                                name="diemdanh"
                                id="co"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setDiemDanh(true)
                                        return
                                    }
                                }}
                            />
                            <label
                                for="co"
                                style={{
                                    marginLeft: '7px',
                                    fontWeight: '600',
                                }}
                            >
                                Có
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="diemdanh"
                                id="khong"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setDiemDanh(false)
                                        return
                                    }
                                }}
                            />
                            <label
                                for="khong"
                                style={{
                                    marginLeft: '7px',
                                    fontWeight: '600',
                                }}
                            >
                                Không
                            </label>
                        </div>
                    </div> */}
                    {/* <InputText
                        placeholder="Ngày làm việc"
                        type="number"
                        setInputContent={setDateWorking}
                    />

                    <InputText
                        placeholder="Nhận xét"
                        setInputContent={setNhanXet}
                    />
                    <h6>Đánh giá</h6>
                    <Rating
                        // name="simple-controlled"
                        value={danhGia}
                        onChange={(event) => {
                            setDanhGia(+event.target.value)
                        }}
                    /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setModalShowDialogAddNC(false)
                        }}
                    >
                        Hủy Bỏ
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalShowDialogAddNC(false)
                            addLichLam()
                        }}
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Container fluid>
            <ModalDialogAddLichLam />
            {/* <ModalDialogDelNgayCong />
            <ModalDialogUpdateSLNgayCong /> */}
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
                <h1
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    Phân Công Nhân Viên
                </h1>
            </div>

            <Paper style={{ width: '100%' }}>
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
                                    placeholder="Tìm Kiếm Nhân Viên Hoặc Công Trình"
                                    className={classes.inputSearch}
                                    onChange={(event) => {
                                        const textSearch = event.target.value.toLowerCase()
                                        const regex = new RegExp(textSearch)

                                        setUITableNhanVien(
                                            allNgayCong.map((e) => {
                                                if (
                                                    regex.test(
                                                        e.HoTen.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.TenCT.toLowerCase()
                                                    )
                                                ) {
                                                    return ItemNhanVien(e)
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
                                maxHeight: '70vh',
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên Nhân Viên</TableCell>
                                        <TableCell>Tên Công Trình</TableCell>
                                        <TableCell>Địa Điểm</TableCell>
                                        <TableCell>Ngày Làm</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UITableNgayCong}</TableBody>
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

export default PhanCongNhanVien

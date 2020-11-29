import React, { useEffect, useState, useRef } from 'react'

import InputText from '../../../resource/InputText/InputText'
import '../../../resource/InputText/css/InputText.css'

//import func valid
import {
    validatedPhone,
    validatedPassword,
    validatedText,
} from '../../../validated/validated'

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
        fontSize: '15px',
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
    },
    itemDialog: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

var lengthDSCT

function DSCongTrinh(props) {
    const URL_API = 'https://qlnscloud.herokuapp.com/congtrinh/'
    const GET_CONGTRINH = 'ToanBoCongTrinh'
    const DEL_CONGTRINH = 'XoaCongTrinh'
    const ADD_CONGTRINH = 'ThemCongTrinh'
    const UPDATE_CONGTRINH = 'CapNhatCongTrinh'
    const TOKEN = sessionStorage.getItem('token')
    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    const [dataDSCT, setDataDSCT] = useState()

    const [UITableCongTrinh, setUITableCongTrinh] = useState()
    const [isNetWork, setIsNetWork] = useState(true)
    const [showDialogCreateCT, setShowDialogCreateCT] = useState(false)
    const [showDialogDeleteCT, setShowDialogDeleteCT] = useState(false)
    const [showDialogUpdateCT, setShowDialogUpdateCT] = useState(false)
    const [loading, setloading] = useState(false)
    const [thongTinCongTrinh, setThongTinCongTrinh] = useState()
    const [loadDSCT, setLoadDSCT] = useState(false)
    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')
    const [severityMess, setSeverityMess] = useState('')

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

    function getDanhSachCongTrinh() {
        setloading(true)
        if (window.fetch) {
            fetch(URL_API + GET_CONGTRINH + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    lengthDSCT = result.data.length
                    RenderUITableCongTrinh(result.data)
                    setDataDSCT(result.data)
                    setloading(false)
                    setLoadDSCT(false)
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
        getDanhSachCongTrinh()
    }, [loadDSCT])

    const classes = useStyles()

    var stt = 0
    function ItemCongTrinh(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.TenCT}</TableCell>
                {/* <TableCell>{props.SLNV}</TableCell> */}
                <TableCell>{props.DiaDiem}</TableCell>
                <TableCell>{props.NgayCP}</TableCell>
                <TableCell>{props.NgayKC}</TableCell>
                <TableCell>{props.NgayHT}</TableCell>

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
                                setThongTinCongTrinh(props)
                                setShowDialogUpdateCT(true)
                            }}
                        >
                            Cập nhật
                        </Button>
                        {/* <Button
                            variant="danger"
                            style={{
                                marginLeft: '5px',
                                width: '100px',
                                fontSize: '17px',
                            }}
                            onClick={() => {
                                console.log('Xóa công trình')
                                setThongTinCongTrinh(props)
                                setShowDialogDeleteCT(true)
                            }}
                        >
                            Xóa
                        </Button> */}
                    </TableCell>
                ) : (
                    <div></div>
                )}
            </TableRow>
        )
    }

    function RenderUITableCongTrinh(data) {
        setUITableCongTrinh(
            data.map((e) => {
                return ItemCongTrinh(e)
            })
        )
    }

    function ModalDialogUpdateCongTrinh() {
        const objThongTinCT = { ...thongTinCongTrinh }

        const [updateTenCT, setUpdateTenCT] = useState()
        const [updateDiaDiem, setUpdateDiaDiem] = useState()
        const [updateNgayCP, setUpdateNgayCP] = useState(objThongTinCT.NgayCP)
        const [updateNgayKC, setUpdateNgayKC] = useState(objThongTinCT.NgayKC)
        const [updateNgayHT, setUpdateNgayHT] = useState(objThongTinCT.NgayHT)

        function updateCongTrinh() {
            if (window.fetch) {
                fetch(URL_API + UPDATE_CONGTRINH + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaCT: objThongTinCT.MaCT,
                        TenCT: updateTenCT ? updateTenCT : objThongTinCT.TenCT,
                        DiaDiem: updateDiaDiem
                            ? updateDiaDiem
                            : objThongTinCT.DiaDiem,
                        NgayCP: updateNgayCP,
                        NgayKC: updateNgayKC,
                        NgayHT: updateNgayHT,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSCT(true)
                            setShowMess(true)
                            setTextMess('Cập nhật công trình thành công!')
                            setSeverityMess('success')
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
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={showDialogUpdateCT}
                onHide={() => setShowDialogUpdateCT(false)}
            >
                <Modal.Header closeButton>
                    <h3>Cập nhật công trình</h3>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Tên công trình"
                        setInputContent={setUpdateTenCT}
                    />
                    <InputText
                        placeholder="Địa điểm"
                        setInputContent={setUpdateDiaDiem}
                    />

                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày cấp phép"
                            type="date"
                            className="input-content"
                            defaultValue={updateNgayCP}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setUpdateNgayCP(e.target.value)
                            }}
                        />
                    </div>

                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày khởi công"
                            type="date"
                            defaultValue={updateNgayKC}
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setUpdateNgayKC(e.target.value)
                            }}
                        />
                    </div>
                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày hoàn thành dự kiến"
                            type="date"
                            defaultValue={updateNgayHT}
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setUpdateNgayHT(e.target.value)
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDialogUpdateCT(false)}
                    >
                        Hủy Bỏ
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateCongTrinh()
                            setShowDialogUpdateCT(false)
                        }}
                    >
                        Cập Nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    // function ModalDialogDelCongTrinh() {
    //     const objTTCT = { ...thongTinCongTrinh }
    //     const [sdt, setSdt] = useState()
    //     const [pass, setPass] = useState()

    //     function delCongTrinh() {
    //         if (window.fetch) {
    //             fetch(URL_API + DEL_CONGTRINH + '?token=' + TOKEN, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     MaCT: objTTCT.MaCT,
    //                     SDT: sdt,
    //                     sdt: pass,
    //                 }),
    //             })
    //                 .then((response) => {
    //                     return response.json()
    //                 })
    //                 .then((result) => {
    //                     if (result.success) {
    //                         setLoadDSCT(true)
    //                         setShowMess(true)
    //                         setTextMess('Xóa công trình thành công!')
    //                         setSeverityMess('success')
    //                         return
    //                     } else {
    //                         setShowMess(true)
    //                         setTextMess(result.mess)
    //                         setSeverityMess('error')
    //                         return
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.log('Lỗi', error)
    //                 })
    //         } else {
    //             console.log('fetch not found')
    //         }
    //     }

    //     function ItemDialogDel(props) {
    //         return (
    //             <div className={classes.itemDialog}>
    //                 <span>{props.label}</span>
    //                 <span style={{ fontWeight: '600', color: 'gray' }}>
    //                     {props.data}
    //                 </span>
    //             </div>
    //         )
    //     }

    //     return (
    //         <Modal
    //             show={showDialogDeleteCT}
    //             onHide={() => setShowDialogDeleteCT(false)}
    //         >
    //             <Modal.Header closeButton>
    //                 <h5>Bạn có muốn xóa công trình này ?</h5>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <div
    //                     style={{
    //                         padding: '0 30px',
    //                     }}
    //                 >
    //                     <ItemDialogDel
    //                         label="Tên Công Trình: "
    //                         data={objTTCT.TenCT}
    //                     />
    //                     <ItemDialogDel
    //                         label="Địa Điểm: "
    //                         data={objTTCT.DiaDiem}
    //                     />
    //                     <ItemDialogDel
    //                         label="Ngày Cấp Phép: "
    //                         data={objTTCT.NgayCP}
    //                     />
    //                     <ItemDialogDel
    //                         label="Ngày Khởi Công: "
    //                         data={objTTCT.NgayKC}
    //                     />
    //                     <ItemDialogDel
    //                         label="Ngày Hoàn Thành Dự Kiến: "
    //                         data={objTTCT.NgayHT}
    //                     />
    //                 </div>
    //                 <hr />
    //                 <h5>Nhập tài khoản xác nhận</h5>
    //                 <InputText
    //                     type="number"
    //                     placeholder="Số điện thoại"
    //                     setInputContent={setSdt}
    //                 />
    //                 <InputText
    //                     type="password"
    //                     placeholder="Mật khẩu"
    //                     setInputContent={setPass}
    //                 />
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button
    //                     variant="secondary"
    //                     onClick={() => setShowDialogDeleteCT(false)}
    //                 >
    //                     Từ Chối
    //                 </Button>
    //                 <Button
    //                     variant="primary"
    //                     onClick={() => {
    //                         if (
    //                             validatedText(sdt, 'số điện thoại') &&
    //                             validatedText(pass, 'mật khẩu')
    //                         ) {
    //                             delCongTrinh()
    //                             setShowDialogDeleteCT(false)
    //                             return
    //                         }
    //                     }}
    //                 >
    //                     Đồng Ý
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     )
    // }

    function ModalDialogCreateCT() {
        const [tenCT, setTenCT] = useState()
        const [diaDiem, setDiaDiem] = useState()
        const [ngayCP, setNgayCP] = useState()
        const [ngayKC, setNgayKC] = useState()
        const [ngayHT, setNgayHT] = useState()

        function createCongTrinh() {
            if (window.fetch) {
                fetch(URL_API + ADD_CONGTRINH + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TenCT: tenCT,
                        DiaDiem: diaDiem,
                        NgayCP: ngayCP,
                        NgayKC: ngayKC,
                        NgayHT: ngayHT,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSCT(true)
                            setShowMess(true)
                            setTextMess('Tạo công trình thành công!')
                            setSeverityMess('success')
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
                setloading(false)
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={showDialogCreateCT}
                onHide={() => setShowDialogCreateCT(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h4
                        style={{
                            color: 'black',
                        }}
                    >
                        Đăng Kí Công Trình
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Tên công trình"
                        setInputContent={setTenCT}
                    />
                    <InputText
                        placeholder="Địa điểm"
                        setInputContent={setDiaDiem}
                    />

                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày cấp phép"
                            type="date"
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setNgayCP(e.target.value)
                            }}
                        />
                    </div>

                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày khởi công"
                            type="date"
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setNgayKC(e.target.value)
                            }}
                        />
                    </div>
                    <div className="input">
                        <TextField
                            id="date"
                            label="Ngày hoàn thành dự kiến"
                            type="date"
                            className="input-content"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setNgayHT(e.target.value)
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDialogCreateCT(false)}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (
                                validatedText(tenCT, 'tên công trình') &&
                                validatedText(diaDiem, 'địa điểm') &&
                                validatedText(ngayCP, 'ngày cấp phép') &&
                                validatedText(ngayKC, 'ngày khởi công') &&
                                validatedText(ngayHT, 'ngày hoàn thành')
                            ) {
                                createCongTrinh()
                                setShowDialogCreateCT(false)
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
            {/* <ModalDialogDelCongTrinh /> */}
            <ModalDialogCreateCT />
            <ModalDialogUpdateCongTrinh />
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
                    Danh Sách Công Trình
                </h1>
                {data_info_person.TypeNV == 2 ? (
                    <Button
                        style={{
                            width: '200px',
                            height: '50px',
                            alignSelf: 'flex-end',
                        }}
                        onClick={() => {
                            setShowDialogCreateCT(true)
                            console.log('Thêm một công trình')
                        }}
                    >
                        Thêm Công Trình
                    </Button>
                ) : (
                    <div></div>
                )}
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
                                    placeholder="Tìm Kiếm Công Trình"
                                    className={classes.inputSearch}
                                    onChange={(event) => {
                                        const textSearch = event.target.value.toLowerCase()
                                        const regex = new RegExp(textSearch)
                                        setUITableCongTrinh(
                                            dataDSCT.map((e) => {
                                                if (
                                                    regex.test(
                                                        e.TenCT.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.DiaDiem.toLowerCase()
                                                    )
                                                ) {
                                                    return ItemCongTrinh(e)
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
                                        <TableCell>Tên Công Trình</TableCell>
                                        {/* <TableCell>
                                            Số Lượng Nhân Viên
                                        </TableCell> */}
                                        <TableCell>
                                            Địa Điểm Công Trình
                                        </TableCell>
                                        <TableCell>Ngày Cấp Phép</TableCell>
                                        <TableCell>Ngày Khởi Công</TableCell>
                                        <TableCell>
                                            Ngày Hoàn Thành Dự Kiến
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UITableCongTrinh}</TableBody>
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

export default DSCongTrinh
export { lengthDSCT }

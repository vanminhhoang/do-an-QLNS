import React, { useEffect, useState, useRef } from 'react'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'

import Dropdown from 'react-bootstrap/Dropdown'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    searchContainer: {
        border: '1px solid black',
        height: '50px',
        width: '100%',
        borderRadius: '50px',
    },
    formSearch: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        height: '100%',
        padding: '0 20px',
    },
    inputSearch: {
        border: 'none',
        outline: 'none',
        height: '100%',
        width: '100%',
        fontSize: '15px',
        fontWeight: '600',
    },
    searchIcon: {
        fontSize: '30px',
        height: '100%',
        cursor: 'pointer',
        color: 'gray',
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
}))

function BangLuong(props) {
    const TOKEN = sessionStorage.getItem('token')
    const URL_API_GET_BANGLUONG =
        'https://qlnscloud.herokuapp.com/ngaycong2/ToanBoNgayCong'
    const [UITableBangLuong, setUITableBangLuong] = useState()
    const [isNetWork, setIsNetWork] = useState(true)
    const [loading, setloading] = useState()
    const [dataDSBL, setDataDSBL] = useState()
    const [loadDSNV, setLoadDSNV] = useState(false)

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const classes = useStyles()

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

    function getDanhSachBangLuong() {
        setloading(true)
        if (window.fetch) {
            fetch(URL_API_GET_BANGLUONG + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    RenderUITableNhanVien(result.data)
                    setloading(false)
                    setLoadDSNV(false)
                    setDataDSBL(result.data)
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
        getDanhSachBangLuong()
    }, [loadDSNV])

    function RenderUITableNhanVien(data) {
        setUITableBangLuong(
            data.map((e, index) => {
                return ItemBangLuong(e, index)
            })
        )
    }

    function ItemBangLuong(props, index) {
        return (
            <TableRow hover>
                <TableCell>{index}</TableCell>
                <TableCell>{props.HoTen}</TableCell>
                <TableCell>{props.TenCT}</TableCell>
                <TableCell>{props.SoNgayCong}</TableCell>
                <TableCell>250,000 VNĐ</TableCell>
                <TableCell>
                    {formatNumber(props.SoNgayCong * 300000)} VNĐ
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Container fluid>
            <div
                style={{
                    display: 'flex',
                    margin: '20px 0',
                }}
            >
                <h1
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    Bảng Lương Nhân Viên
                </h1>
            </div>

            <Paper>
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
                                    placeholder="Tìm Kiếm Bảng Lương Theo Tên Nhân Viên"
                                    className={classes.inputSearch}
                                    onChange={(event) => {
                                        const textSearch = event.target.value.toLowerCase()
                                        const regex = new RegExp(textSearch)

                                        setUITableBangLuong(
                                            dataDSBL.map((e, index) => {
                                                if (
                                                    regex.test(
                                                        e.HoTen.toLowerCase()
                                                    )
                                                ) {
                                                    return ItemBangLuong(
                                                        e,
                                                        index
                                                    )
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
                                minHeight: '70vh',
                                maxHeight: '70vh',
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Họ Tên</TableCell>
                                        <TableCell>
                                            Công Trình Tham Gia
                                        </TableCell>
                                        <TableCell>Ngày Công</TableCell>
                                        <TableCell>Lương/Ngày</TableCell>
                                        <TableCell>Tổng Lương</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UITableBangLuong}</TableBody>
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

export default BangLuong

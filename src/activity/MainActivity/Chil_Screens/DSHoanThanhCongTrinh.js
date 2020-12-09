import React, { useEffect, useState } from 'react'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'
import Spinner from 'react-bootstrap/Spinner'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
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
        fontSize: '18px',
        fontWeight: '600',
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
}))

function DSCongTrinhHoanThanh(props) {
    const classes = useStyles()
    const URL_API = 'https://qlnscloud.herokuapp.com/congtrinh2/'
    const GET_CONGTRINH = 'ToanBoCongTrinh'
    const TOKEN = sessionStorage.getItem('token')

    const [UITableCongTrinhHT, setUITableCongTrinhHT] = useState()

    const [loading, setLoading] = useState(false)

    const [dataDSCTHT, setDataDSCTHT] = useState()

    function getDanhSachCongTrinhHT() {
        setLoading(true)
        if (window.fetch) {
            fetch(URL_API + GET_CONGTRINH + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    RenderUITableCongTrinhHT(result.data)
                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    console.error('Fetch to false', error)
                })
        } else {
            console.log('Fetch not found')
        }
    }

    useEffect(() => {
        getDanhSachCongTrinhHT()
    }, [])

    function RenderUITableCongTrinhHT(data) {
        setUITableCongTrinhHT(
            data.map((e) => {
                if (e.TienDo == 100) {
                    return ItemCTHoanThanh(e)
                }
            })
        )
        setDataDSCTHT(
            data.map((e) => {
                if (e.TienDo == 100) {
                    return e
                }
            })
        )
    }

    var stt = 0
    function ItemCTHoanThanh(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.TenCT}</TableCell>
                <TableCell>{props.DiaDiem}</TableCell>
                <TableCell>{props.NgayHT}</TableCell>
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
                    Danh Sách Công Trình Hoàn Thành
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
                <div className={classes.searchContainer}>
                    <form className={classes.formSearch}>
                        <input
                            type="text"
                            placeholder="Tìm Kiếm Tên Hoặc Địa Điểm Công Trình"
                            className={classes.inputSearch}
                            onChange={(event) => {
                                const textSearch = event.target.value.toLowerCase()
                                const regex = new RegExp(textSearch)
                                setUITableCongTrinhHT(
                                    dataDSCTHT.map((e) => {
                                        if (e) {
                                            if (
                                                regex.test(
                                                    e.TenCT.toLowerCase()
                                                ) ||
                                                regex.test(
                                                    e.DiaDiem.toLowerCase()
                                                )
                                            ) {
                                                return ItemCTHoanThanh(e)
                                            }
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
                        maxHeight: '75vh',
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên Công Trình</TableCell>
                                <TableCell>Địa Điểm</TableCell>
                                <TableCell>Ngày Hoàn Thành</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{UITableCongTrinhHT}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default DSCongTrinhHoanThanh

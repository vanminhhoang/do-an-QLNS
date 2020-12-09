import React from 'react'
import { Link } from 'react-router-dom'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

//Import react material-ui
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

//import icon material
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function ChiTietTienDoCongTrinh(props) {
    const percentage = 66 //Phần trăm tiến độ

    var stt = 0
    function ItemHangMuc(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>Xây Thô</TableCell>
                <TableCell>
                    <DoneIcon />
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Container
            fluid
            style={{
                height: '100vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center ',
                    alignItems: 'center',
                }}
            >
                <Link to="/Dashboard/TienDoCongTrinh">
                    <Button
                        style={{
                            width: '140px',
                            fontSize: '17px',
                        }}
                    >
                        Quay lại
                    </Button>
                </Link>
                <h1 style={{ width: '100%', textAlign: 'center' }}>
                    Chi Tiết Tiến Độ Công Trình
                </h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '60px',
                }}
            >
                <Paper
                    style={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            color: 'gray',
                            fontSize: '35px',
                            fontWeight: '600',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        Công Trình A
                    </div>
                    <div
                        style={{
                            width: '500px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}/100`}
                        />
                    </div>
                </Paper>
                <Paper
                    style={{
                        width: '55%',
                    }}
                >
                    <div
                        style={{
                            color: 'gray',
                            fontSize: '35px',
                            fontWeight: '600',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        Hạng Mục
                    </div>
                    <TableContainer
                        style={{
                            maxHeight: '600px',
                            width: '100%',
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên Hạng Mục</TableCell>
                                    <TableCell>Hoàn Thành</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                                <ItemHangMuc />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </Container>
    )
}

export default ChiTietTienDoCongTrinh

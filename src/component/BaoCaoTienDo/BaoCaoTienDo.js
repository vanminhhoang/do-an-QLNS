import React from 'react'
import './BaoCaoTienDo.css'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

export default class BaoCaoTienDo extends React.Component {
    render() {
        console.log(this.props.item)
        const date = this.props.item.date

        return (
            <div
                style={{
                    padding: '25px',
                }}
            >
                <div className="header-baocao">
                    <div className="name-coquan">
                        <h3>Tên Công Ty</h3>
                        <h4>. . . . . . . . . . . . .</h4>
                    </div>
                    <div>
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <h4 style={{ textAlign: 'center' }}>
                            Độc lập - Tự do - Hạnh Phúc
                        </h4>
                        <h5 style={{ textAlign: 'center' }}>
                            . . . . . ., ngày {date.getDate()} tháng{' '}
                            {date.getMonth() + 1} năm {date.getFullYear()}
                        </h5>
                    </div>
                </div>
                <div>
                    <div className="title-baocao">
                        <h3>BÁO CÁO TIẾN ĐỘ CÔNG TRÌNH THEO THÁNG</h3>
                        <h3>
                            THÁNG {date.getMonth() + 1} - NĂM{' '}
                            {date.getFullYear()}
                        </h3>
                    </div>
                    <div className="info-baocao">
                        <h5>Họ và tên: {this.props.item.name}</h5>
                        <h5>Chức vụ: Trưởng Phòng</h5>
                        <h5>Phòng ban: Dự Án</h5>
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
                                    <TableCell>Địa Điểm</TableCell>
                                    <TableCell>Ngày Cấp Phép</TableCell>
                                    <TableCell>Ngày Khởi Công</TableCell>
                                    <TableCell>
                                        Ngày Hoàn Thành Dự Kiến
                                    </TableCell>
                                    <TableCell>Tiến Độ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.item.listCT.map((e, index) => {
                                    return (
                                        <TableRow hover>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{e.TenCT}</TableCell>
                                            <TableCell>{e.DiaDiem}</TableCell>
                                            <TableCell>{e.NgayCP}</TableCell>
                                            <TableCell>{e.NgayKC}</TableCell>
                                            <TableCell>{e.NgayHT}</TableCell>
                                            <TableCell>{e.TienDo}%</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="ki-ten">
                        <h4>Tổng Giám Đốc</h4>
                        <h4>Người Báo Cáo</h4>
                    </div>
                </div>
            </div>
        )
    }
}

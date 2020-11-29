import React, { useState, useEffect } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'

function ModalWL({ srcImg, show, setShow, header, heightImg, widthImg }) {
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [render, setRender] = useState(null)

    const _renderImg = () => {
        var temprender = []
        if (srcImg.map != undefined) {
            srcImg.map((current) => {
                temprender.push(
                    <Carousel.Item>
                        <img
                            src={current}
                            style={{
                                height: heightImg,
                                width: widthImg,
                                // objectFit: 'cover',
                                // imageRendering: 'pixelated',
                            }}
                        />
                    </Carousel.Item>
                )
            })
        }
        setRender(temprender)
    }

    useEffect(() => {
        _renderImg()
    }, [])

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <h5 style={{ color: 'black' }}>{header}</h5>
            </Modal.Header>
            <Modal.Body>
                <Carousel>{render}</Carousel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWL

// prop
// array img duoi dang nhu sau
// var srcImg = [
//     require('../../assets/Img/1.jpg'),
//     require('../../assets/Img/2.jpg'),
// ]
// show truyen vao bien de show va close thong bao : false close , true : show
// setShow truyen vao bien de set gia tri cua show
// header : text header
// heightImg : chieu cao anh
// widthImg : chieu rong anh

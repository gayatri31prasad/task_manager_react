import React, { useEffect, useState } from 'react'
import './LoaderModal.css'
import ReactModal from "react-modal";
import Lottie from "lottie-react";
import loaderJson from "../../assets/PANLoader.json"

const LoaderModal = (props) => {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            // marginRight: '-50%',
            transform: "translate(-50%, -50%)",
            minWidth: "500px",
            borderRadius: "25px",
            border: "none",
            padding: "10px",
            backgroundColor: "transparent ",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000
        },
    };
    const style = {
        width: "15%"
    };

    useEffect(() => {
        props.setLoader == true ?
            LoaderOpen() : LoaderClose()
    }, [props.setLoader])

    const [loader, setLoader] = useState({
        isOpen: false,
        onRequestClose: null
    })
    const LoaderClose = () => {
        setLoader({
            isOpen: false,
            onRequestClose: true

        })
    }
    const LoaderOpen = () => {
        setLoader({
            isOpen: true,
            onRequestClose: null
        })
    }
    return (
        <ReactModal ariaHideApp={false}
            isOpen={loader.isOpen}
            contentLabel="Minimal Modal Example"
            className={props.class}
            overlayClassName="LoaderOverlay"
            onRequestClose={loader.onRequestClose}
            style={customStyles}
        >
            <div className="MsgDiv">
                <Lottie animationData={loaderJson} style={style} />
            </div>
        </ReactModal>
    )
}

export default LoaderModal;
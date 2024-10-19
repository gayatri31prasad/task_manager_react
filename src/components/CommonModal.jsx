import React from 'react'
import Modal from "react-modal";

export default function CommonModal({ children, isOpen = false, onRequestClose = () => null, ...props }) {
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={'modalOverlayStyle'}
            className={`modalStyle ${props?.className}`}
            {...props}
        >
            {children}
        </Modal>)
}

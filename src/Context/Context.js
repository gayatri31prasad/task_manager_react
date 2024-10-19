import Modal from "react-modal";
import Lottie from "lottie-react";
import { createContext } from "react";
import Oops from "../assets/Opps.json";
import completed from "../assets/Success.json";
import React, { useContext, useState } from "react";
import { ComponentAndScreenConstant } from "../constants/componentAndScreenConstant";

const SelectedCardContext = createContext();

const useSelectedCardContext = () => {
    return useContext(SelectedCardContext)
}

const SelectedCardProvider = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [AlertMessages, setAlertMessages] = useState({
        message: '',
        isWaring: false,
        isVisible: false,
    })

    const setWarning = (message) => {
        setAlertMessages({
            message: message,
            isWaring: true,
            isVisible: true,
        })
    }

    const setAlert = (message) => {
        setAlertMessages({
            message: message,
            isWaring: false,
            isVisible: true,
        })
    }

    const resetAlertMessages = () => {
        setAlertMessages({
            message: '',
            isWaring: false,
            isVisible: false,
        });
    }

    return (
        <SelectedCardContext.Provider value={{ selectedCard, setSelectedCard, isLoading, setIsLoading, setWarning, setAlert }}>
            <>
                {children}
                <Modal
                    ariaHideApp={false}
                    className={`modalStyle`}
                    overlayClassName={'modalOverlayStyle AlertModal'}
                    isOpen={AlertMessages.isVisible}
                    onRequestClose={resetAlertMessages}
                >
                    <div className='warningOrAlert'>
                        <Lottie
                            loop={true}
                            animationData={AlertMessages?.isWaring ? Oops : completed}
                            className="delAccModalErrLottie"
                        />
                        {
                        // AlertMessages.message?.includes(':') ?
                        //     AlertMessages?.message.split(":").slice(1).join(":").trim()
                        //     :
                            AlertMessages?.message}
                        <button onClick={resetAlertMessages}>OK</button>
                    </div>
                </Modal>
                <ComponentAndScreenConstant.LoaderModal setLoader={isLoading} />
            </>
        </SelectedCardContext.Provider>
    )
}


export { SelectedCardContext, useSelectedCardContext, SelectedCardProvider }
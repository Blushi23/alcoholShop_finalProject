import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { siteTheme } from "../App";

interface AgeConfirmationProps {
    show: boolean;
    onHide: Function;
}

const AgeConfirmation: FunctionComponent<AgeConfirmationProps> = ({ show, onHide }) => {
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let image = darkMode ? "/images/shelf-white.png" : "/images/shelf-black.png"
    let [openAgeModal, setOpenAgeModal] = useState<boolean>(false);
    let [modalContent, setModalContent] = useState<string>("Are you over 18 years old?");
    let [showButtons, setShowButtons] = useState<boolean>(true);

    useEffect(() => {
        setOpenAgeModal(true)
    }, [])
    let handleCloseAgeModal = () => {
        setOpenAgeModal(false)
    }

    return (
        <>
            <Modal show={openAgeModal} onHide={() => handleCloseAgeModal()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className={`${theme}`}>

                <div className="popUpModal">
                    <Modal.Body className="text-center age-modal-content">
                        <div className="row">
                            <div className="col-sm-9 ms-5 mt-2"><h1>WAIT!</h1>
                                <p>{modalContent}</p>
                                {showButtons && (
                                    <><Button className="age-btn" onClick={() => handleCloseAgeModal()}>Yes</Button><br />
                                        <Button className="mt-2 age-btn" onClick={() => { setModalContent("I'm sorry, You can't enter this site.See you after your 18th Birthday."); setShowButtons(false) }}>Not yet</Button>
                                    </>
                                )}</div>
                        </div>
                        <div className="shelf-container">
                            <div className="col-sm-3 shelf mt-2 mb-0">
                                <img src={image} alt="alcohol bottles" /></div>
                            <div className="col-sm-3 shelf mt-2 mb-0">
                                <img src={image} alt="alcohol bottles" /></div>
                            <div className="col-sm-3 shelf mt-2 mb-0">
                                <img src={image} alt="alcohol bottles" /></div>
                        </div>

                        <hr />
                        <p className="warning"><b>Warning:</b> Excessive consumption of alcohol is life threatening and is detrimental to health! </p>

                    </Modal.Body>
                </div>
            </Modal >
        </>
    )
}

export default AgeConfirmation;
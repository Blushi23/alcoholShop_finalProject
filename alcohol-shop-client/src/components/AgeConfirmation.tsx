import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { siteTheme } from "../App";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../services/feedbackService";

interface AgeConfirmationProps {
    show: boolean;
    onHide: Function;
}

const AgeConfirmation: FunctionComponent<AgeConfirmationProps> = ({ show, onHide }) => {
    let theme = useContext(siteTheme);
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

                    <Modal.Body className="text-center">
                        <h5>WAIT!</h5>
                        <p>{modalContent}</p>
                        {showButtons && (
                            <><Button className="w-25" onClick={() => handleCloseAgeModal()}>Yes</Button><br />
                                <Button className="mt-2 w-25" onClick={() => { setModalContent(`I'm sorry, You can't enter this site. See you after your 18th Birthday.`); setShowButtons(false) }}>Not yet</Button>
                            </>
                        )}

                        <hr />
                        <p className="warning"><b>Warning:</b> Excessive consumption of alcohol is life threatening and is detrimental to health! </p>

                    </Modal.Body>

                </div>
            </Modal >

        </>
    )
}

export default AgeConfirmation;
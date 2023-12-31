import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";
import { Button, Modal } from "react-bootstrap";

interface AlertModalProps {
    showAlert: boolean;
    hideAlert: Function;
}

const AlertModal: FunctionComponent<AlertModalProps> = ({ showAlert, hideAlert }) => {
    let theme = useContext(siteTheme);

    return (
        <>
            <Modal show={showAlert} onHide={() => hideAlert()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`${theme}`}>

                <div className="alert-popUpModal">
                    <Modal.Body className="text-center alert-modal-content">
                        <div className="row">
                            <div className="col-sm-9 ms-5 mt-2"><h1>We are very sorry...</h1>
                                <p>Minimum drinking age regulations apply.  <br />Please register to proceed with purchases. Thank you for understanding</p>
                                <Button className="btn age-btn" onClick={() => hideAlert()}>Close</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal >
        </>
    )
}

export default AlertModal;



import { FunctionComponent, useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { siteTheme } from "../App";
import Login from "./Login";
import Register from "./Register";

interface LoginModalProps {
    show: boolean;
    onHide: Function;
    setUserInfo: Function;
}

const LoginModal: FunctionComponent<LoginModalProps> = ({ show, onHide, setUserInfo }) => {
    let [key, setKey] = useState<string>()
    let theme = useContext(siteTheme);

    // useEffect(() => {
    // if (show) setKey('login');
    // }, [show]);

    return (
        <>
            <Modal show={show} onHide={() => onHide()}
                aria-labelledby="contained-modal-title-vcenter"
                // aria-labelledby="example-custom-modal-styling-title"
                centered
                dialogClassName="modal-90w"
                className={`${theme}`}>

                <div className="modalContent">
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Tabs
                        // defaultActiveKey="login"
                        activeKey={key}
                        onSelect={(k) => setKey(k as string)}
                        id="controlled-tab-example"
                        className="mb-3"
                        fill
                    >

                        <Tab eventKey="login" title="Login">
                            {key === 'login' &&
                                <Login setUserInfo={setUserInfo} onHide={onHide} />
                            }
                        </Tab>

                        <Tab eventKey="register" title="Register">
                            {key === 'register' &&
                                <Register setUserInfo={setUserInfo} onHide={onHide} />
                            }
                        </Tab>

                        <Tab eventKey="guest" title="Continue as a guest" >
                            <div className="container text-center">
                                <button type="button" className="btn w-75 register-btn my-3"
                                    onClick={() => setKey('register')}
                                >I want to register</button>
                                <button type="submit" className="btn w-75 guest-btn my-3" onClick={() => onHide()}>Continue as a guest</button>

                            </div>
                        </Tab>

                        {/* <Tab eventKey="guest" title="Continue as a guest">g</Tab> */}
                        {/* <Tab eventKey="login" title="Login"> 
                            <Login setUserInfo={setUserInfo} onHide={onHide} />
                        </Tab>

                        <Tab eventKey="register" title="Register">
                            <Register setUserInfo={setUserInfo} onHide={onHide} />
                        </Tab>
                       */}
                    </Tabs>
                </div>

            </Modal >        </>
    )
}

export default LoginModal;


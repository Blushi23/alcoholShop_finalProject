import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";

interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {



    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border loading" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div></div>
        </>
    )
}

export default Loading;
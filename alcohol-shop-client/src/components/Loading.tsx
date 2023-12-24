import { FunctionComponent } from "react";

interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <>
            <div className="spinner-border loading ms-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {/* <div className="loading">
                <span><i className="fas fa-wine-bottle"></i></span>
                <span><i className="fas fa-wine-bottle"></i></span>
                <span><i className="fas fa-wine-bottle"></i></span>
                <div className="line"></div>
            </div> */}
        </>
    )
}

export default Loading;
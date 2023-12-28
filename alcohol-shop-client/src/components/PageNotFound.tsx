import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    let navigate = useNavigate();

    return (
        <>
            <div className="img-404 d-flex justify-content-center align-items-center my-3">
                <img src="/images/404.png" style={{ width: "20rem" }} alt="404" /></div>
            <div className="text-404-container">
                <p className="mx-3 text-404"><b>Oops! Looks like you stumbled into uncharted territory!</b> <br />
                    At Liquor Land, we're all about finding the perfect spirits, but it seems you've discovered a different kind of spirit – <b>the elusive 404! </b><br />
                    While we're pros at navigating through bottles of whiskey, vodka, and rum, this page seems to be a bit tipsy and lost. <br />Don't worry, though! Our team is on the hunt to guide you back to the land of fantastic drinks and vibrant concoctions. <br />Meanwhile, why not raise a glass to your adventurous spirit and let's toast to finding our way back together!  <img src="/images/cheers.gif" style={{ height: "6rem" }} alt="cheers" /></p>
            </div>
            <div className="btn-404-container">
                <button className="btn notFound-btn" onClick={() => navigate(-1)}> <i className="fa-solid fa-martini-glass-citrus"></i> Click here to go back</button></div>      </>
    )
}

export default PageNotFound;
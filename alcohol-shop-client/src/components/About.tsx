import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";
import Contact from "./Contact";

interface AboutProps {
    openContactModal: boolean; setOpenContactModal: Function
}

const About: FunctionComponent<AboutProps> = ({ openContactModal, setOpenContactModal }) => {
    let theme = useContext(siteTheme)
    let darkMode = theme === "dark";

    let background = darkMode ? "/images/dark-about.png" : "/images/light-about.png"
    return (
        <>
            <div className="aboutPage">
                <div className="imageContainer">
                    <img src={background} alt="frame" />


                    <div className=" aboutText">
                        <h4 className="about-title">Welcome to Liquor Land, Where Every Sip Tells a Story</h4>
                        <p className="about-para">At Liquor Land, we don't just sell beverages; we craft experiences bottled with passion, swirled with expertise, and served with a dash of humor. Step into our online store, where every bottle holds more than just liquid- each label whispers tales of heritage, culture, and maybe a few wild parties!</p>

                        <h6>Our Spirit</h6>
                        <p>We're not just another online liquor store; we're your spirited companions in your quest for the perfect libation. With a treasure trove of spirits sourced from every corner of the globe, we pride ourselves on being your ultimate drink whisperers.</p>

                        <h6>The Liquid Library</h6>
                        <p>Imagine our shop as a mystical library, but instead of books, shelves are adorned with bottles- each telling a unique story. From the aged oaks of Kentucky bourbon to the crisp vineyards of French wine, our shelves house more tales than a seasoned storyteller.</p>

                        <h6>Our Team</h6>
                        <p>Our team comprises experts- alchemists in their own right. They're not just knowledgeable; they're passionate storytellers, eager to guide you through our liquid collection, pairing advice, and perhaps a few whimsical anecdotes along the way.</p>

                        <h6>Sip, Click, Enjoy!</h6>
                        <p>Pour a glass, take a seat, and browse through our online shelves. Whether you're a seasoned connoisseur or a curious novice, there's something here waiting to tantalize your taste buds, intrigue your senses, and maybe even inspire a new drinking tale.</p>


                        <h6>Cheers to You <i className="fa-solid fa-champagne-glasses"></i></h6>
                        <p>Thank you for stopping by and joining our merry band of liquid enthusiasts!<br /> Grab your glass, browse our selection, and embark on a delightful journey in Liquor Land- where every sip is a chance to create your story.</p>

                        <p>So, here's to laughter, good company, and great drinks!
                            Cheers from the Liquor Land team.</p>
                        <button className="btn mt-5 about-btn" onClick={() => setOpenContactModal(true)}>Click here to contact us</button>
                    </div>
                </div>
            </div>
            <Contact
                show={openContactModal}
                onHide={() => setOpenContactModal(false)} />
        </>
    )
}

export default About;
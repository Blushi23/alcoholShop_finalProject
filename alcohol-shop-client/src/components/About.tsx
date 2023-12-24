import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container aboutPage">
                <h4>Welcome to Liquor Land, Where Every Sip Tells a Story</h4>
                <p>At Liquor Land, we don't just sell beverages; we craft experiences bottled with passion, swirled with expertise, and served with a dash of humor. Step into our online store, where every bottle holds more than just liquid—each label whispers tales of heritage, culture, and maybe a few wild parties!</p>

                <h6>Our Spirit</h6>
                <p>We're not just another online liquor store; we're your spirited companions in your quest for the perfect libation. With a treasure trove of spirits sourced from every corner of the globe, we pride ourselves on being your ultimate drink whisperers.</p>

                <h6>The Liquid Library</h6>
                <p>Imagine our shop as a mystical library, but instead of books, shelves are adorned with bottles—each telling a unique story. From the aged oaks of Kentucky bourbon to the crisp vineyards of French wine, our shelves house more tales than a seasoned storyteller.</p>

                <h6>Our Team</h6>
                <p>Our team comprises experts—alchemists in their own right. They're not just knowledgeable; they're passionate storytellers, eager to guide you through our liquid collection, pairing advice, and perhaps a few whimsical anecdotes along the way.</p>

                <h6>Sip, Click, Enjoy!</h6>
                <p>Pour a glass, take a seat, and browse through our online shelves. Whether you're a seasoned connoisseur or a curious novice, there's something here waiting to tantalize your taste buds, intrigue your senses, and maybe even inspire a new drinking tale.</p>
                {/* 
            <h6>Let's Connect!</h6>
            <p>Liquor Land isn't just a shop; it's a community. Join us on our socials, where we share stories, cocktail recipes, and celebrate the joy of a well-mixed drink. Dive into our blog—a concoction of fun facts, drink history, and occasional shenanigans.</p> */}

                <h6>Cheers to You <i className="fa-solid fa-champagne-glasses"></i></h6>
                <p>Thank you for stopping by and joining our merry band of liquid enthusiasts! Grab your glass, browse our selection, and embark on a delightful journey through Liquor Land— where every sip is a chance to create your story.</p>

                <p>So, here's to laughter, good company, and great drinks! <br />
                    Cheers from the Liquor Land team.</p>

            </div>
        </>
    )
}

export default About;
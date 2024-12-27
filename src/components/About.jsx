import React from 'react';
import { Link } from 'react-scroll';
import './About.css';

const About = () => {
    return (
        <div className="about" id="about">
            <div className="text">
                <h1>About us</h1>                    
                <p>
                    At <span className="gold-highlight">MotionArt</span>, we specialize in creating stunning motion design that tells your brand’s story. 
                    <span className="bold-highlight">From 2D and explainer videos</span>, our team crafts visually engaging content that captures attention 
                    and drives results. We believe in the power of <span className="bold-highlight">creativity, quality, and collaboration</span> to bring 
                    your vision to life. Whether for<span className="bold-highlight"> a commercial, social media campaign, or digital branding </span>, we’re 
                    here to make your message stand out through the art of motion. Contact us and let’s create 
                    something amazing together!
                </p>
                <Link 
                    to="Galery" // Target the "Galery" section
                    spy={true} 
                    smooth={true} 
                    offset={-100} 
                    duration={500}
                >
                    <button className="button">
                        Explore More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default About;

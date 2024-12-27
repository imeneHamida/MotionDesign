import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './Galery.css';

// Custom hook for parallax effect
function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// Component for each video with parallax effect
const VideoWithParallax = ({ url, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref);  // Trigger only once when in view
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 200);  // Apply parallax effect

    const [scrollDirection, setScrollDirection] = useState(null);

    // Determine scroll direction (up or down)
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollDirection('down');  // Scrolling down
            } else {
                setScrollDirection('up');  // Scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Extract the video ID from the Vimeo URL
    const videoId = url.split('/').pop();

    return (
        <motion.div
            ref={ref}
            className="video-container"
            initial={{ opacity: 0, y: scrollDirection === 'down' ? -100 : 100 }}  // Start from below or above
            animate={inView ? { opacity: 1, y: 0 } : {}} // Animate to final position when in view
            transition={{
                duration: 0.8,                        // Duration of the animation
                ease: "easeOut",                      // Easing function for smooth effect
                delay: index * 0.2                    // Staggered delay for each video
            }}
        >
            <motion.div className="iframe-wrapper">
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&controls=1&dnt=1`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="fullscreen;"
                    allowFullScreen
                    title={`Vimeo video ${index}`}
                />
            </motion.div>
        </motion.div>
    );
};

// Main gallery component
const Galery = () => {
    // List of video URLs
    const videoUrls = [
        "https://vimeo.com/1041595476",
        "https://vimeo.com/915788231",
        "https://vimeo.com/903947970",
        "https://vimeo.com/906353409"
    ];

    const [scrollDirection, setScrollDirection] = useState(null);

    // Handle scroll direction (up or down)
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollDirection('down');  // Scrolling down
            } else {
                setScrollDirection('up');  // Scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='Galery' >
            <div className='videos-container'>
                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}  
                    animate={{ opacity: 1, y: 0 } }  
                    transition={{
                        duration: 0.9,                        
                        ease: "easeOut",
                        delay: 0.5                    
                    }}
                >
                    Our <span style={{ color: '#38B6FF' }}>Latest</span> Creations
                </motion.h1>
                {/* Video items */}
                {videoUrls.map((url, index) => (
                    <VideoWithParallax url={url} index={index + 1} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Galery;

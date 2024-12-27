import React, { useState, useRef, useEffect } from 'react';
import replayButton from '../assets/images/replay-button.png'; // Adjust path as needed
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './Home.css';
import ooredooAd from '../assets/images/Video.mp4';
import scrollDownArrow from '../assets/images/down-arrow.png';

const Home = () => {
    // State to track video status
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [isAutoplayFailed, setIsAutoplayFailed] = useState(false);
    const [isPaused, setIsPaused] = useState(true); // Track play/pause state
    const videoRef = useRef(null);

    // Detect video end and set states accordingly
    const handleVideoEnd = () => {
        setIsVideoEnded(true);
        setIsPaused(true); // Ensure state reflects the video is paused
    };

    // Handle play button click, restart video if needed
    const handlePlayClick = () => {
        setIsVideoEnded(false);
        setIsAutoplayFailed(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Reset to start
            videoRef.current.play(); // Play the video
            setIsPaused(false); // Update state to playing
        }
    };

    // Toggle play/pause on video click
    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPaused(false); // Update state to playing
            } else {
                videoRef.current.pause();
                setIsPaused(true); // Update state to paused
            }
        }
    };

    // Preserve video state when tab visibility changes
    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.hidden) {
                if (videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause();
                    setIsPaused(false); // Save play state
                }
            } else {
                if (videoRef.current) {
                    if (!isPaused) {
                        videoRef.current.play().catch(() => {}); // Resume if it was playing
                    }
                }
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [isPaused]);

    // Autoplay handling with error handling for autoplay failure
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current
                .play()
                .then(() => {
                    setIsPaused(false); // Autoplay succeeded
                })
                .catch(() => {
                    setIsAutoplayFailed(true); // Show play button on autoplay fail
                    setIsPaused(true);
                });
        }
    }, []);

    return (
        <div className="home">
            {/* Video Container */}
            <div className="video-container">
                <video
                    ref={videoRef}
                    id="background-video"
                    src={ooredooAd}
                    className="background-video"
                    onEnded={handleVideoEnd}
                    controls={false}
                    onClick={handleVideoClick}
                ></video>
                {/* Show overlay with replay button when video ends or autoplay fails */}
                {(isVideoEnded || isAutoplayFailed) && (
                    <div className="overlay">
                        <div className="play-button" onClick={handlePlayClick}>
                            <img src={replayButton} alt="Replay Button" className="play-button-img" />
                        </div>
                    </div>
                )}
            </div>

            {/* Scroll Down Arrow with animation */}
            <motion.div
                className="scroll-down-arrow"
                animate={{ y: [0, 10, 0] }}  // Animate the arrow moving up and down
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",  // Smooth easing
                }}
            >
                <Link to="about" spy={true} smooth={true} offset={-50} duration={500}>
                    <img src={scrollDownArrow} alt="scroll down arrow" className="scroll-down-arrow" />
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;

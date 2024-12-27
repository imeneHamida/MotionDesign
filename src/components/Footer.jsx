import React from 'react';
import './Footer.css';
import { Link } from 'react-scroll';
import { motion } from "framer-motion";
import {
  HomeOutlined,
  PlayCircleOutlined,
  PhoneOutlined,
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinFilled,
} from '@ant-design/icons';

const Footer = () => {

    // Social icons configuration
    const socialIcons = [
        { icon: <FacebookFilled />, key: 'facebook', url: 'https://www.facebook.com' },
        { icon: <InstagramOutlined />, key: 'instagram', url: 'https://www.instagram.com' },
        { icon: <TwitterOutlined />, key: 'twitter', url: 'https://x.com/' },
        { icon: <LinkedinFilled />, key: 'linkedin', url: 'https://www.linkedin.com' },
    ];

    return (
        <div className='Footer'>
            <div className='Footer-content'>
                
                {/* Footer navigation menu */}
                <ul className="footer-menu">
                    <li>
                        <Link to="home" spy={true} smooth={true} hashSpy={true} offset={-100} duration={500}>
                            <HomeOutlined /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to='Galery' spy={true} smooth={true} hashSpy={true} offset={-100} duration={500}>
                            <PlayCircleOutlined /> Galery
                        </Link>
                    </li>
                    <li>
                        <Link to='Contacts' spy={true} smooth={true} hashSpy={true} offset={-100} duration={500}>
                            <PhoneOutlined /> Contacts
                        </Link>
                    </li>
                </ul>
                
                {/* Social media icons */}
                <div className="social-icons">
                    {socialIcons.map(({ icon, key, url }) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                {icon}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;

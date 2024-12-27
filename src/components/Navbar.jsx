import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import LogoGif from '../assets/images/Logo.mp4';
import { Link } from 'react-scroll';
import { WhatsAppOutlined, MailOutlined } from '@ant-design/icons';

import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);

    return (
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <video className="logo-gif" src={LogoGif} autoPlay loop muted />
                </a>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#2D66EE' }} />)
                        : (<FaBars size={30} style={{ color: '#2D66EE' }} />)}
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to="home" spy={true} smooth={true} hashSpy={true} offset={-100} duration={500} onClick={closeMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='about' spy={true} smooth={true} hashSpy={true} offset={-100} duration={500} onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='Galery' spy={true} smooth={true} hashSpy={true} offset={-100} duration={500} onClick={closeMenu}>Galery</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='Contacts' spy={true} smooth={true} hashSpy={true} offset={50} duration={500} onClick={closeMenu}>Contacts</Link>
                    </li>
                </ul>
                <ul className="nav-menu">
                  <li className="nav-item contact-item">
                    <a
                        href="https://wa.me/213776018465"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                    >
                        <WhatsAppOutlined style={{ marginRight: '5px' }} /> +213 776 01 84 65
                    </a>
                  </li>
                  <li className="nav-item contact-item">
                    <Link to="Contacts" spy={true} smooth={true} hashSpy={true} offset={50} duration={500}>
                        <MailOutlined style={{ marginRight: '5px' }} /> MotionDesignCompany@gmail.com
                    </Link>
                  </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

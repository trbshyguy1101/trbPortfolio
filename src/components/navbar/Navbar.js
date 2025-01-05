import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import logo_chat from '../../assets/chat.png';
import trb_logo from '../../assets/trb_logo.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={trb_logo} alt="Logo" className="logo"/>
            <div className="nav-links">
                <Link className='desktopMenuItem' to="intro" smooth={true} duration={1000}>Intro</Link>
                <Link className='desktopMenuItem' to="about" smooth={true} duration={1000}>About</Link>
                <Link className='desktopMenuItem' to="projects" smooth={true} duration={1000}>Projects</Link>
                <Link className='desktopMenuItem' to="snake" smooth={true} duration={1000}>Snake</Link>
            </div>
            <Popup trigger={
            <button className='desktopMenuButton'>
                <img src={logo_chat} alt="Menu" className="menu" />
                Contact
            </button>} modal nested>
                {close => (
                    <div className="modal">
                        <div className="innerModal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Contact me </div>
                        <div className="content">
                            {' '}
                            <form>
                                <input type="text" placeholder="Name" />
                                <input type="text" placeholder="Email" />
                                <textarea placeholder="Message" />
                            </form>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    close();
                                }}
                            >
                                Send
                            </button>
                        </div>
                        </div>
                    </div>
                )}
            </Popup>
        </nav>
    )
}

export default Navbar;
import './footer.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className='footer-page'>
        <h2>trbCompany Inc. </h2>
      <div className='social-media-links'>
        <a href="https://github.com/trbshyguy1010" className='social'><span id="actual-text">My GitHub</span> <span id="arrow">{">"}</span></a>
        <a href="https://discord.com/users/486213059535175712" className='social'><span id="actual-text">My Discord</span> <span id="arrow">{">"}</span></a>
      </div>
    </footer>
  );
};

export default Footer;

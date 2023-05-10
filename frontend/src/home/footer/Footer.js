import React from 'react';
import './footer.css';
import PetsIcon from '@mui/icons-material/Pets';

const Footer = () => (
  <div className='pml__footer section__padding'>
    {/* <div className='pml__footer-heading'>
      <h1 className='gradient__text'>
        Do you want to step in to the future before others
      </h1>
    </div>

    <div className='pml__footer-btn'>
      <p>Request Early Access</p>
    </div> */}

    <div className='pml__footer-links'>
      <div className='pml__navbar-title'>
        <PetsIcon /> MeowLand
      </div>
      <div className='pml__footer-links_div'>
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className='pml__footer-links_div'>
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className='pml__footer-links_div'>
        <h4>Get in touch</h4>
        <p>Crechterwoord K12 182 DK Alknjkcb</p>
        <p>085-132567</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className='pml__footer-copyright'>
      <p>@2023 PML. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;

import React from 'react';

import './Footer.css'

export default function Footer(props) {
    return (
        <div className="footer">
        <div class="footerEntry">
          <p className="footerLink">
            <a
              href="http://resq.s3-website-us-east-1.amazonaws.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-link"></i>
            </a>
          </p>
          <p className="footerLink">
            <a
              href="https://www.instagram.com/sapartyom/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </p>
          <p className="footerLink">
            <a
              href="https://github.com/artySapa"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-github"></i>
            </a>
          </p>
          <p className="footerLink">
            <a
              href="https://www.linkedin.com/in/sapartyom/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </p>
          <p className="footerLink">sapartyom@g.ucla.edu</p>
          <p className="footerLink">(424)415-2827</p>
          <a className="footerLink" href="./artycv.pdf" download="Arty artycv.pdf">Resume</a>
        </div>
      </div>
    );
}

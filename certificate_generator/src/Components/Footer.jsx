import React from "react";
const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-copyright text-center">
          Developed by
          <a
            className="white-text"
            target="_blank"
            href="https://soham-official.github.io/"
            rel="noreferrer"
          >
            {" "}
            Soham{" "}
          </a>
          ,
          <a
            className="white-text"
            target="_blank"
            href="https://www.linkedin.com/in/srinjoy-pal-36a076183/"
            rel="noreferrer"
          >
            {" "}
            Srinjoy{" "}
          </a>
          <br />
          &copy; All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;

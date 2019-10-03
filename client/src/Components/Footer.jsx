import React from "react";
//Footer that displays on the bottom of each page
const Footer = () => {
  return (
    <footer>
      <div className="text-center mt-5">
        <div className="contact-info-footer">
          {/* Company name and address */}
          <p className="company-name">Hummingbird Guitars Inc.</p>

          <address className="company-address">
            1234 Somewhere Avenue, Charlotte, NC 28211
          </address>
          <span className="phone-number mb-2">Phone: (123)345-5678</span>
        </div>
        {/* Icons for social media linked to Fender social media pages */}
        <a
          href="https://www.facebook.com/Fender/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://images.ecosia.org/pqiclG1Y4j_RwGmXLL35LV8DKH0=/0x390/smart/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Fff%2FFacebook_logo_36x36.svg%2F1024px-Facebook_logo_36x36.svg.png"
            alt="Facebook logo"
            className="logo"
          />
        </a>

        <a
          href="https://www.instagram.com/fender/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://rakuten.today/wp-content/uploads/2018/02/instagram-logo.png"
            alt="Instagram logo"
            className="logo"
          />
        </a>

        <a
          href="https://twitter.com/Fender?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://akns-images.eonline.com/eol_images/Entire_Site/201377/rs_600x600-130807142437-600.twitter2.cm.8713.jpg"
            alt="twitter logo"
            className="logo"
          />
        </a>
      </div>
      {/* Copyright and lastUpdated text displayed in the corners of the page */}
      <span className="copyright">Copyright 2019</span>
      <span className="lastUpdated">Last Updated Sep. 27th 2019</span>
    </footer>
  );
};

export default Footer;

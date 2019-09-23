import React from 'react'
import Form from './Form'

const Contact = () => {
    return (
    <div>
    <h1 className="text-center mt-4">Contact Us!</h1>

      <div className="phone-address-email text-center mt-3">
      <address className="company-address">1234  Somewhere Avenue, Charlotte, NC 28211</address>
          <span className="phone-number mb-2">Phone Number: (123)345-5678</span>
          <span>E-mail: info@hummingbirdguitars.com</span>
        </div>
    {/* Contact form with Name Email and comment */}
    {<Form />}
    </div>
    )}

    export default Contact;
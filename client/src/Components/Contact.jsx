import React, { Component } from 'react'
import Form from './Form'

class Contact extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('/api/contacts', {
      method: "GET"
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      console.log(data)
    })
    .catch(console.log)
  }
  render() {
    const { contacts } = this.state
    return (
    <div>
    <h1 className="page-header text-center mt-4 contact-title">Contact Us!</h1>

      <div className="phone-address-email text-center mt-3">
      <address className="company-address">1234  Somewhere Avenue, Charlotte, NC 28211</address>
          <span className="phone-number mb-2">Phone Number: (123)345-5678</span>
          <span>E-mail: info@hummingbirdguitars.com</span>
        </div>
    {/* Contact form with Name Email and comment */}
   
    {<Form />}
    <div className="column-2">
    <h2 className="page-header">Comments</h2>
      <ul className="mt-5 contact-list">
        {contacts.map(contact => {
          return (
          <li key={contact.contact_id} className="mt-3 mr-5 mb-3 contact-list-item">
            <p className="contact-name ml-1 mr-1">{contact.firstname}</p>
            <p className="contact-name ml-1 mr-1">{contact.lastname}</p>
            <p className="contact-message ml-1 mr-1">{contact.user_message}</p>
          </li>
          )
        })}
      </ul>
    </div>
    </div>
    )}
  }

    export default Contact;
import React, { Component } from "react"; //Import react
import Form from "./Form"; //Import Contact Form component

//Component for contact page
class Contact extends Component {
  //Contacts array in state to use with .map() for comment section
  state = {
    contacts: []
  };
  //When the component mounts execute a fetch to get the data as contacts from the contacts table and save to contacts in state fetch is a asynchronous and returns a promise. To get the res you have to use .then()
  componentDidMount() {
    fetch("/api/contacts", {
      method: "GET"
    })
      .then(res => res.json())
      .then(contacts => {
        this.setState({ contacts });
      })
      .catch(console.log);
  }
  // When the x button by the contacts is clicked perform a fetch with method DELETE and pass the contact's id as a req.params. Once this has finished parse the response and set State with the new data.
  handleClick = (e) => {
    const id = JSON.stringify({"id": e.target.value})
    fetch(`/api/contacts/delete`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: id
    })
    .then(res => res.json())
    .then(contacts => {
      this.setState({ contacts })
    })
    .catch(console.log)
  }

  //When the form is submitted fetch with a POST method sending back the data from the form in the body of the request then parse the data sent back and set the state with the new data
  handleSubmit = (data) => {
    fetch("/api/contacts/new", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(contacts => this.setState({ contacts }))
  }

  render() {
    //Deconstruct this.state.contacts
    const { contacts } = this.state;

    return (
      <div>
        <h1 className="page-header text-center mt-4 contact-title">
          Contact Us!
        </h1>

        <div className="phone-address-email text-center mt-3">
          <address className="company-address">
            1234 Somewhere Avenue, Charlotte, NC 28211
          </address>
          <span className="phone-number mb-2">Phone Number: (123)345-5678</span>
          <span>E-mail: info@hummingbirdguitars.com</span>
        </div>

        {/* Contact form with Name Email and comment passing props for submit to get back data from form*/}
        {<Form handleSubmit={this.handleSubmit} />}

        <div className="column-2">
          <h2 className="page-header">Comments</h2>
          <ul className="mt-5 contact-list">
            {/* Check the length of the contacts array if it is empty it returns a message otherwise it maps through and creates a list with the comments */}
            {contacts.length >= 1 ? (
              contacts.map(contact => {
                return (
                  <li
                    key={contact.contact_id} 
                    className="mt-2 mr-5 contact-list-item"
                  >
                    <button className="float-right x-button" value={contact.contact_id} onClick={(e => {
                      this.handleClick(e)
                    })}>x</button> 
                    <p className="contact-name ml-1 mr-1">
                      {contact.firstname}
                    </p>
                    <p className="contact-name ml-1 mr-1">{contact.lastname}</p>
                    <p className="contact-message ml-1 mr-1">
                      {contact.user_message}
                    </p>
                  </li>
                );
              })
            ) : (
              <p className="no-comments">Be the first to comment...</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

//Export the Contact component for use in other components
export default Contact;

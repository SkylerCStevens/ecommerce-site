import React from 'react';
import useForm from 'react-hook-form'
//Component for form on contact page. Used React-Hook-Form for the validation. 
const Form = () => {
  //Deconstructing the necessary parts of useForm() from react-hook-form
  const { register, handleSubmit, errors } = useForm()
  //logging the data from inputs
  const onSubmit = data => { console.log(data) }

        return (         
<div className="form-container column-1">
<form className="cmxform" id="commentForm" onSubmit={handleSubmit(onSubmit)} method="get" action="#" noValidate>
<div className="form-group">
  <legend>Send Us a Message:</legend>
  <div>
    <div className=" mt-4 ">
    <label className="contact-label top-label" htmlFor="first-name">First Name</label>
    {/* React-Hook-Form uses the ref to set what is required to validate */}
    <input className="form-control" id="first-name" name="firstname" minLength="2" type="text" placeholder="First Name" ref={register({ required: true, minLength: 2 })} required /> 
    {/* These are the messages that show up if a certain part of validation is not met */}
    {errors.firstname && errors.firstname.type === 'required' && <span className="text-danger">Your First Name is required</span>}
    {errors.firstname && errors.firstname.type === 'minLength' && <span className="text-danger">Your First Name Must Be Longer than 2 Characters</span>}
    </div>
  <div className=" mt-4">
      <label className="contact-label" htmlFor="last-name">Last Name</label>
      <input className="form-control" id="last-name" name="lastname" minLength="2" type="text" placeholder="Last Name" ref={
    register({ required: true, minLength: 2})} required/> 
      {errors.lastname && errors.lastname.type === 'required' && <span className="text-danger">Your Last Name is required</span>}
      {errors.lastname && errors.lastname.type === 'minLength' && <span className="text-danger">Your Last Name Must Be Longer than 2 Characters</span>}
      </div>
    </div>
  <div className="mt-4 ">
    <label className="contact-label" htmlFor="email">E-mail</label>
    <input className="form-control" id="email" type="email" name="email" placeholder="example@email.com" ref={register({required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})} required />
    {errors.email && errors.email.type === 'required' && <span className="text-danger">Your E-mail is required</span>}
      {errors.email && errors.email.type === 'pattern' && <span className="text-danger">Please Enter a Valid E-mail address</span>}
  </div>
  <div className="mt-4 ">
    <label className="contact-label" htmlFor="comment">Comments/Feedback</label>
    <textarea className="form-control" id="comment" name="comment" placeholder="Please leave us a comment!" ref={register({ required: true, minLength: 5 })} required></textarea>
    {errors.comment && errors.comment.type === 'required' && <span className="text-danger">A Comment is Required</span>}
      {errors.comment && errors.comment.type === 'minLength' && <span className="text-danger">Your Comment Must Be At Least 5 Characters</span>}
  </div>
  <div className="text-center mt-4">
      <input className="submit btn-secondary btn mb-2" type="submit" value="Submit" />
  </div>
</div>
</form>
</div>
        )
}

export default Form;
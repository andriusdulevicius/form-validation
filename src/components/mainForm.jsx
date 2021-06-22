import React, { Component } from 'react';
import Joi from 'joi-browser';

class MainForm extends Component {
  state = {
    account: { username: '', email: '', password: '', repeatPassword: '', agreement: '' },
    errors: {},
  };

  //validacijos schema
  schema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    repeatPassword: Joi.ref('password'),
    agreement: Joi.boolean().required(),
  };

  validateForm = () => {
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });

    if (!result.error) return;
    const errors = {};
    // errors.username = result.error.details;

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    // console.log('local Errors', errors);
    this.setState({ errors });

    // if (this.state.account.username.length === 0) {
    //   this.setState({ errors: { username: 'Cannot be blank' } });
    //   return;
    // }
    // if (this.state.account.username.length < 4) {
    //   this.setState({ errors: { username: 'Must be more than 3 chars long.' } });
    // }
  };

  handlesubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: '' });
    this.validateForm();

    // this.setState({ account: { username: '', email: '', password: '', repeatPassword: '', agreement: false } });
  };

  syncInput = (e) => {
    this.setState({ account: { ...this.state.account, [e.target.name]: e.target.value } });
  };

  handleChecked = (e) => {
    console.log(e);
    this.setState({ account: { ...this.state.account, agreement: e.target.checked } });
  };

  addNewAccount = () => {};

  render() {
    const { account, errors } = this.state;
    return (
      <div className='main-form'>
        <h1>Main form</h1>
        <form className='form-inputs' action='submit' onSubmit={this.handlesubmit}>
          <input
            value={account.username}
            onChange={this.syncInput}
            type='text'
            name='username'
            className={errors.username && 'is-invalid'}
            placeholder='Enter Username'
          />
          {errors.username && <p className='error-msg'>{errors.username}</p>}
          <input
            className={errors.email && 'is-invalid'}
            value={account.email}
            onChange={this.syncInput}
            type='text'
            name='email'
            placeholder='Enter email'
          />
          {errors.email && <p className='error-msg'>{errors.email}</p>}
          <input
            value={account.password}
            onChange={this.syncInput}
            type='text'
            name='password'
            placeholder='Enter your password'
            className={errors.password && 'is-invalid'}
          />
          {errors.password && <p className='error-msg'>{errors.password}</p>}
          <input
            className={errors.repeatPassword && 'is-invalid'}
            value={account.repeatPassword}
            onChange={this.syncInput}
            type='text'
            name='repeatPassword'
            placeholder='Repeat your password'
          />
          {errors.repeatPassword && <p className='error-msg'>{errors.repeatPassword}</p>}
          <div>
            <input
              className={errors.agreement && 'is-invalid checkbox'}
              value={account.agreement}
              onChange={this.handleChecked}
              type='checkbox'
              id='agreement'
              name='agreement'
            ></input>
            <label htmlFor='agreement'>Agree to our terms and conditions</label>
            {errors.agreement && <p className='error-msg'>{errors.agreement}</p>}
          </div>
          <button className='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default MainForm;

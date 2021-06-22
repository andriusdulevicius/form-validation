import React, { Component } from 'react';
import Joi from 'joi-browser';
import ValidationResults from './validationResults';

class MainForm extends Component {
  state = {
    account: { username: '', email: '', password: '', repeatPassword: '', agreement: '' },
    errors: {},
    errorMessages: {
      agreement: 'Please confirm our terms and conditions',
      repeatPassword: 'Password must match!',
    },
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

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema);
    if (result.error) {
      this.setState({ errors: { ...this.state.errors, [name]: result.error.details[0].message } });
    } else {
      const errorsCopy = { ...this.state.errors };
      delete errorsCopy[name];
      this.setState({ errors: errorsCopy });
    }
  };

  resetErrors = () => {
    this.state.account.agreement === false && this.setState({ account: { ...this.state.account, agreement: '' } });
    this.setState({ errors: '' });
  };

  handlesubmit = async (e) => {
    e.preventDefault();
    await this.resetErrors();
    this.validateForm();

    // this.setState({ account: { username: '', email: '', password: '', repeatPassword: '', agreement: false } });
  };

  syncInput = (e) => {
    const { name, value } = e.target;
    this.setState({ account: { ...this.state.account, [name]: value } });
    this.validateProperty(name, value);
  };

  handleChecked = (e) => {
    console.log(e);
    this.setState({ account: { ...this.state.account, agreement: e.target.checked } });
  };

  passProps = () => {
    if (this.state.errors.password) return true;
    if (this.state.errors.repeatPassword) return true;
    return false;
  };

  render() {
    const { account, errors, errorMessages } = this.state;
    return (
      <div className='main-form'>
        <h1>Main form</h1>
        <div className='flex'>
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
            {errors.repeatPassword && <p className='error-msg'>{errorMessages.repeatPassword}</p>}
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
              {errors.agreement && <p className='error-msg'>{errorMessages.agreement}</p>}
            </div>
            <button className='submit'>Submit</button>
          </form>
          <ValidationResults errors={this.passProps()} />
        </div>
      </div>
    );
  }
}

export default MainForm;

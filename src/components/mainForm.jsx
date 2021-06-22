import React, { Component } from 'react';

class MainForm extends Component {
  state = {
    account: { username: '', email: '', password: '', repeatPassword: '', agreement: false },
    errors: {},
  };

  validateForm = () => {
    if (this.state.account.username.length === 0) {
      this.setState({ errors: { username: 'Cannot be blank' } });
      return;
    }
    if (this.state.account.username.length < 4) {
      this.setState({ errors: { username: 'Must be more than 3 chars long.' } });
    }
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
          <input value={account.email} onChange={this.syncInput} type='text' name='email' placeholder='Enter email' />
          <input
            value={account.password}
            onChange={this.syncInput}
            type='text'
            name='password'
            placeholder='Enter your password'
          />
          <input
            value={account.repeatPassword}
            onChange={this.syncInput}
            type='text'
            name='repeatPassword'
            placeholder='Repeat your password'
          />
          <div>
            <input
              value={account.agreement}
              onChange={this.handleChecked}
              type='checkbox'
              id='agreement'
              name='agreement'
            ></input>
            <label for='agreement'>Agree to our terms and conditions</label>
          </div>
          <button className='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default MainForm;

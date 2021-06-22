import React, { Component } from 'react';

class MainForm extends Component {
  state = {
    account: { username: '', email: '', password: '', repeatPassword: '', agreement: false },
  };

  handlesubmit = (e) => {
    e.preventDefault();
    this.addNewAccount(this.state.newNote);

    this.setState({ account: { username: '', email: '', password: '', repeatPassword: '', agreement: false } });
  };

  syncInput = (e) => {
    this.setState({ account: { ...this.state.account, [e.target.name]: e.target.value } });
  };

  handleChecked = (e) => {
    this.setState({ account: { ...this.state.account, agreement: e.target.checked } });
  };

  addNewAccount = () => {};

  render() {
    const { account } = this.state;
    return (
      <div className='main-form'>
        <h1>Main form</h1>
        <form className='form-inputs' action='submit' onSubmit={this.handlesubmit}>
          <input
            value={account.username}
            onChange={this.syncInput}
            type='text'
            name='username'
            placeholder='Enter Username'
          />
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

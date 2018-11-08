import React, { Component } from 'react';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {data: null}
  }


  render() { 
    return (
      <div className="SignUp">
        <form className="form-horizontal">
          <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
                <div className="control-input">
                  <input type="text" id="email" placeholder="Email" className="form-control" />
                </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-email" className="control-label">Password</label>
                <div className="control-input">
                  <input type="password" id="confirm-email" placeholder="Confirm Email" className="form-control" />
                </div>
            </div>

            <button 
              className="Button"
              type="submit"
            >Login</button>

        </form>
      </div>
    )
  }
}
import React, { Component } from 'react';

export default class Login extends Component {
  render() { 
    return (
      <div className="SignUp">
        <form class="form-horizontal">
          <h2>Login</h2>
            <div class="form-group">
              <label for="email" class="control-label">Email</label>
                <div class="control-input">
                  <input type="text" id="email" placeholder="Email" class="form-control" autofocus />
                </div>
            </div>

            <div class="form-group">
              <label for="confirm-email" class="control-label">Password</label>
                <div class="control-input">
                  <input type="password" id="confirm-email" placeholder="Confirm Email" class="form-control" autofocus />
                </div>
            </div>

        </form>
      </div>
    )
  }
}
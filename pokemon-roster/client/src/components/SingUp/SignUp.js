import React, { Component } from 'react';

export default class SignUp extends Component {
  render() { 
    return (
      <div className="SignUp">
        <form class="form-horizontal">
          <h2>Sign Up</h2>
            <div class="form-group">
              <label for="email" class="control-label">Email</label>
                <div class="control-input">
                  <input type="text" id="email" placeholder="Email" class="form-control" autofocus />
                </div>
            </div>

            <div class="form-group">
              <label for="confirm-email" class="control-label">Confirm Email</label>
                <div class="control-input">
                  <input type="text" id="confirm-email" placeholder="Confirm Email" class="form-control" autofocus />
                </div>
            </div>

            <div class="form-group">
              <label for="username" class="control-label">User Name</label>
                <div class="control-input">
                  <input type="text" id="username" placeholder="User Name" class="form-control" autofocus />
                </div>
            </div>

            <div class="form-group">
              <label for="password" class="control-label">Password</label>
                <div class="control-input">
                  <input type="password" id="password" class="form-control" autofocus />
                </div>
            </div>

            <div class="form-group">
              <label for="confirm-password" class="control-label">Confirm Password</label>
                <div class="control-input">
                  <input type="confirm-password" id="password" class="form-control" autofocus />
                </div>
            </div>
        </form>
      </div>
    )
  }
}
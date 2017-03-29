var React = require('react');

const {login} = require('../clientSoap');
var Evergreen = React.createClass({
  getInitialState : function() {
    return {isLoggedIn: false, username: null}
  },
  onSubmit: function (event) {
    event.preventDefault();
    login(this.refs.username.value, this.refs.password.value, (succesed, result) => {
         this.setState({isLoggedIn: succesed, username: this.refs.username.value });
    });

  },
  renderWhenNotLoggedIn: function() {
    if (this.state.isLoggedIn) return null;
    return (
      <div>
        <h1>Login</h1>
          <form ref="form" onSubmit={this.onSubmit} className="login-form">
          <input type="text" ref="username" placeholder="Enter Username"/>
          <input type="text" ref="password" placeholder="Enter Password"/>
          <button>Start</button>
        </form>
      </div>
      )
  },
  renderWhenLoggedIn: function () {
    if (!this.state.isLoggedIn) return null;
    return (<h1>Your are logged in : Thank you {this.state.username}</h1>)

  },
  render: function() {
    return(
     <div>
          {this.renderWhenLoggedIn()}
          {this.renderWhenNotLoggedIn()}
     </div>
   )
  }
});

module.exports = Evergreen;

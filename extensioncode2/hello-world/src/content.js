import * as InboxSDK from '@inboxsdk/core';
import React, { useState } from 'react';
import { render } from "react-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import { App } from './react-components/react-main.js';

startExtension();
let Data = [];
let SDK = [];
let COMPOSEVIEW = '';
let EXISTIGNUSERID = '';
let USERLOGGEDIN = false;
// async function getData() {
//   let response = await fetch('https://chrome.myprojectstaging.com:3000/api/groups?filter=%7B%22where%22%3A%20%7B%22enduserId%22%3A%221%22%7D%2C%22include%22%3A%5B%22emails%22%5D%7D');
//   console.log(response);
//   return response.json()
// }

async function checkloggedIn() {
  // this.getGroupData()
  return chrome.storage.sync.get(['userId']);
  // if (userId) {
  //   this.getGroupData(userId)
  // }
}



async function startExtension() {
  let sdk = await InboxSDK.load(1, "sdk_ChromExFurq2050_ee9f7d02da");
  SDK = sdk;
  const { Compose: GmailDomComposer } = sdk;
  console.log('befre');
  let loggedInResponse = await checkloggedIn();
  console.log(loggedInResponse);
  if (loggedInResponse) {
    EXISTIGNUSERID = loggedInResponse.userId;
    USERLOGGEDIN = true;
  }
  console.log('after');
  //let data = await (getData()) || [];
  //Data = data;
  //console.log(data);

  GmailDomComposer.registerComposeViewHandler(composeView => {
    console.log(composeView);
    COMPOSEVIEW = composeView;
    composeView.addButton({
      title: "Gmail Chrome Extension",
      iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
      onClick: function (event) {

        sdk.Widgets.showModalView({
          title: 'Groups List',
          el: '<div id = "test-comp"></div> '//getData(),
        });
        render(<Toggle />, document.getElementById('test-comp'));
        const style = {
          'font-size': "20px"
        }
        function RenderGroup() {
          console.log(data);
          let groupsDataDiv = [];
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            let group = data[i].name;
            console.log(group);
            groupsDataDiv.push(<div>
              <button onclick="setEmails(group)">
                {group}
              </button>
            </div>);
          }
          return (<div>
            {groupsDataDiv}
          </div>);
        }
        function setEmails(group) {
          console.log(group)

        }

      },
    })

  });
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true, data: Data, isloggedIn: USERLOGGEDIN, user: null, email: '', password: '', userId: EXISTIGNUSERID };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.setRecipents = this.setRecipents.bind(this);
    // this.checkloggedIn = this.checkloggedIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.getGroupData = this.getGroupData.bind(this);
    this.signout = this.signout.bind(this);
    //this.checkloggedIn();
    if (this.state.userId) {
      this.setState({ isloggedIn: true })
      this.getGroupData(this.state.userId);
    }
  }
  handleClick(group) {
    console.log(group);
    console.log(COMPOSEVIEW);
    this.setRecipents(group);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  setRecipents(recipients) {
    recipients = recipients.emails;
    let emails = [];
    for (let i = 0; i < recipients.length; i++) {
      const { email } = recipients[i];
      emails.push(email);
    }
    COMPOSEVIEW.setToRecipients(emails)
  }

  getGroupData(userId) {
    console.log(userId);
    let response = fetch('https://chrome.myprojectstaging.com:3000/api/groups?filter=%7B%22where%22%3A%20%7B%22enduserId%22%3A%221%22%7D%2C%22include%22%3A%5B%22emails%22%5D%7D')
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ data: res });
        this.setState({ isloggedIn: true })
      });
  }


  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    // Prevent page reload
    event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };
    console.log(requestOptions);
    fetch('https://chrome.myprojectstaging.com:3000/api/endusers/login', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ isloggedIn: true })
        this.setState({ user: res })
        this.setState({ userId: res?.userId })
        chrome.storage.sync.set({ userId: res.userId }, function () {
          console.log('Value is set to ' + res.userId);
        });
      });
  };
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  signout() {
    chrome.storage.local.set({ userId: null }, () => {
      this.setState({ isloggedIn: false });
      EXISTIGNUSERID = null;
    })
  }


  render() {
    let groupsDataDiv = [];
    const style = {
      'font-size': '16px;',
      "margin": "10px",
      "background-color": "#04AA6D",
      "border-radius": "16px",
      "height": "30px",
      "background": "white"
    }
    const flexContainer = {
      "display": "flex",
      "flex-wrap": "nowrap",
      "border": "2px solid black"
    }
    for (let i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i]);
      let group = this.state.data[i].name;
      console.log(group);
      groupsDataDiv.push(<div>
        <button style={style} onClick={() => this.handleClick(this.state.data[i])}>
          {group}
        </button>
      </div>);
    }
    if (this.state.isloggedIn) {
      return (
        <div>
          <div style={flexContainer}>
            {groupsDataDiv}
          </div>
          <Button block size="lg" onClick={this.signout}>
            signout
          </Button>
        </div >
      );
    } else {
      return (
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                onChange={this.setEmail.bind(this)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={this.setPassword.bind(this)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!this.validateForm()}>
              Login
            </Button>

          </Form>
        </div>
      );
    }
  }
}
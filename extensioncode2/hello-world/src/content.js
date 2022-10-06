import * as InboxSDK from '@inboxsdk/core';
import React, { useState } from 'react';
import { render } from "react-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./react-components/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
startExtension();
let Data = [];
let SDK = [];
let COMPOSEVIEW = '';
let MESSAGEVIEW = '';
var EXISTIGNUSERID = '';
let USERLOGGEDIN = false;
let MODAL = ';';
// intentionally add var instead of let.
var showThreadButtonBooleaan = 1;

async function checkloggedIn() {
  return chrome.storage.sync.get(['userId']);
}


async function startExtension() {
  let sdk = await InboxSDK.load(1, "sdk_ChromExFurq2050_ee9f7d02da");
  SDK = sdk;
  const { Compose: GmailDomComposer, Conversations, Toolbars, registerToolbarButtonForList, getThreadView } = sdk;
  console.log('befre');
  let loggedInResponse = await checkloggedIn();
  console.log(loggedInResponse);
  if (loggedInResponse.userId) {
    EXISTIGNUSERID = loggedInResponse.userId;
    USERLOGGEDIN = true;
  }
  console.log('after');

  GmailDomComposer.registerComposeViewHandler(composeView => {
    console.log(composeView);
    COMPOSEVIEW = composeView;
    composeView.addButton({
      title: "Gmail Chrome Extension",
      iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
      onClick: function (event) {
        MODAL = sdk.Widgets.showModalView({
          title: 'Groups List',
          el: '<div id = "test-comp"></div> '//getData(),
        });
        render(<Toggle />, document.getElementById('test-comp'));
      },
    })

  });

  Conversations.registerMessageViewHandler(messageViewHandler => {
    console.log(messageViewHandler);
    let elementBody = messageViewHandler.getBodyElement();
    console.log(elementBody);
    MESSAGEVIEW = messageViewHandler;
    console.log(showThreadButtonBooleaan);
    if (showThreadButtonBooleaan == 1) {
      showThreadButtonBooleaan = 0;

      Toolbars.registerThreadButton({
        title: "customButton",
        iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
        onClick: function (event) {
          MODAL = sdk.Widgets.showModalView({
            title: 'Email Info',
            el: '<div id = "message-view-comp"></div> '//getData(),
          });
          render(<RegisterMessageViewIconOnClick />, document.getElementById('message-view-comp'));
        },
      });
    }
  })





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
    this.closeWidget = this.closeWidget.bind(this);
    this.showGroupTemplates = this.showGroupTemplates.bind(this);
    this.setTemplatesOnEmailBody = this.setTemplatesOnEmailBody.bind(this);


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
    COMPOSEVIEW.setToRecipients(emails);
    // COMPOSEVIEW.setBodyHTML();
  }

  getGroupData(userId) {
    console.log(userId);
    let response = fetch(`https://chrome.myprojectstaging.com:3000/api/groups?filter={"where": {"enduserId":${userId}},"include":["emails","templates"]}`)
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
        if (res.userId) {
          this.setState({ isloggedIn: true })
          this.setState({ user: res })
          this.setState({ userId: res?.userId })
          chrome.storage.sync.set({ userId: res.userId }, function () {
            console.log('Value is set to ' + res.userId);
          });
          this.getGroupData(this.state.userId);
        }
      }).catch(err => {
        alert('UserName or password is incorrect');
      });
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  signout() {
    chrome.storage.sync.set({ userId: null }, () => {
      this.setState({ isloggedIn: false });
      EXISTIGNUSERID = null;
    })
  }

  closeWidget() {
    if (MODAL) {
      MODAL.close();
    }
  }

  setTemplatesOnEmailBody(template) {
    console.log(JSON.parse(template.html));
    COMPOSEVIEW.setBodyHTML(JSON.parse(template.html));
  }

  showGroupTemplates(templates) {
    const style = {
      'font-size': '16px;',
      "background-color": "#04AA6D",
      "border-radius": "16px",
      "background": "white",
      "border": "0"
    }
    console.log(templates)
    let finalTempaltes = [];
    for (let i = 0; i < templates.length; i++) {
      finalTempaltes.push(
        <li>
          <button style={style} onClick={() => this.setTemplatesOnEmailBody(templates[i])}>
            {templates[i].name}
          </button>
        </li>
      )
    }
    if (finalTempaltes.length) {
      return (<div>{finalTempaltes}</div>)
    } else {
      return (<div></div>)
    }
  }


  render() {
    let groupsDataDiv = [];
    const style = {
      'font-size': '16px;',
      "background-color": "#04AA6D",
      "border-radius": "16px",
      "background": "white",
      "border": "0"
    }
    const mainDivBorder = {
      "border": "1px solid black",
      "margin": "2px",
      "padding": "2px",
      "width": "250px",
    };
    const flexContainer = {
      "width": "550px",
      "height": "300px",
      "overflow-y": "scroll",
    };
    const mainflexDiv = {
      "display": "flex",
      "flex-flow": "row wrap"
    };
    const heading = {
      "font-weight": "bold",
      "text-decoration-line": "underline",
      "margin": "0 auto"
    }
    for (let i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i]);
      let group = this.state.data[i].name;
      console.log(group);
      groupsDataDiv.push(
        <div style={mainDivBorder}>
          <h4 style={heading}>Group {i + 1}</h4>
          <ul>
            <li>
              <button style={style} onClick={() => this.handleClick(this.state.data[i])}>
                {group}
              </button>
            </li>
          </ul>
          <h4 style={heading}>Templates</h4>
          <div>
            <ul>
              {this.showGroupTemplates(this.state.data[i].templates)}
            </ul>
          </div>
        </div>
      );
    }
    if (this.state.isloggedIn) {
      return (
        <div>
          <div style={flexContainer}>
            <div style={mainflexDiv}>
              {groupsDataDiv}
            </div>
          </div>
          <button className="button-container-logout" onClick={this.signout}> Signout</button>
          <button className="button-container-close" onClick={this.closeWidget}> Close</button>

        </div >
      );
    } else {
      return (
        <div className="Login">
          <div className="title">Sign In</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <div className="input-container">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  onChange={this.setEmail.bind(this)}
                />
              </div>
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <div className="input-container">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.setPassword.bind(this)}
                />
              </div>
            </Form.Group>
            <div className="button-container">
              <input type="submit" disabled={!this.validateForm()} />
            </div>

          </Form>
        </div>
      );
    }
  }
}

class RegisterMessageViewIconOnClick extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showmessage: 'Send Data to App.' };
    this.getMessageBody = this.getMessageBody.bind(this);
    this.getMessageRecipents = this.getMessageRecipents.bind(this);
    this.sendDataToApp = this.sendDataToApp.bind(this);

  }
  getMessageBody() {
    console.log(JSON.stringify(MESSAGEVIEW.getBodyElement().outerHTML));
    return MESSAGEVIEW.getBodyElement().outerHTML;
  }
  getMessageRecipents() {
    console.log(MESSAGEVIEW.getRecipients());
    return MESSAGEVIEW.getRecipients();
  }

  sendDataToApp() {
    if (!EXISTIGNUSERID) {
      alert("You are not logged In");
      return;
    }
    let messageBody = this.getMessageBody();
    let messageRecipents = this.getMessageRecipents();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlTemplate: JSON.stringify(messageBody),
        htmlRecipient: JSON.stringify(messageRecipents),
        enduserId: EXISTIGNUSERID
      })
    };
    console.log(requestOptions);
    fetch('https://chrome.myprojectstaging.com:3000/api/emailinformations', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ showmessage: "Data has been send to Web App succesfully" })
      }).catch(err => {
        alert('Error in sending the Data');
      });
  }
  render() {
    let UI = (
      <div>
        <h5>
          {this.state.showmessage}
        </h5>
        <button className='button-container-close' onClick={() => this.sendDataToApp()}>
          Send Data To Web App
        </button>
      </div>);

    return UI;
  }

}
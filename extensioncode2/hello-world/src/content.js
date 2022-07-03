import * as InboxSDK from '@inboxsdk/core';
import React, { useState } from 'react';
import { render } from "react-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./react-components/Login.css";

startExtension();
let Data = [];
let SDK = [];
let COMPOSEVIEW = '';
let EXISTIGNUSERID = '';
let USERLOGGEDIN = false;
let MODAL = ';';

async function checkloggedIn() {
  return chrome.storage.sync.get(['userId']);
}



async function startExtension() {
  let sdk = await InboxSDK.load(1, "sdk_ChromExFurq2050_ee9f7d02da");
  SDK = sdk;
  const { Compose: GmailDomComposer } = sdk;
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
    this.closeWidget = this.closeWidget.bind(this);
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
    COMPOSEVIEW.setBodyHTML(`
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 520px) {
      .u-row {
        width: 500px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 500px !important;
      }
    
    }
    
    @media (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } </style>
      
      
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <ol>
    <li style="font-size: 14px; line-height: 19.6px;">Hello this is Furqan</li>
    </ol>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`)
  }

  getGroupData(userId) {
    console.log(userId);
    let response = fetch(`https://chrome.myprojectstaging.com:3000/api/groups?filter={"where": {"enduserId":${userId}},"include":["emails"]}`)
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
            {/* <div className="button-container">
              i
              <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                Login
              </Button>
            </div> */}
            <div className="button-container">
              <input type="submit" disabled={!this.validateForm()} />
            </div>

          </Form>
        </div>
      );
    }
  }
}
import * as InboxSDK from '@inboxsdk/core';
import React from 'react';
import { render } from "react-dom";
// import { App } from './react-components/react-main.js';

startExtension();
let Data = [];
let SDK = [];
let COMPOSEVIEW = '';
async function getData() {
  let response = await fetch('https://chrome.myprojectstaging.com:3000/api/groups?filter=%7B%22where%22%3A%20%7B%22enduserId%22%3A%221%22%7D%2C%22include%22%3A%5B%22emails%22%5D%7D');
  console.log(response);
  return response.json()
}


async function startExtension() {
  let sdk = await InboxSDK.load(1, "sdk_ChromExFurq2050_ee9f7d02da");
  SDK = sdk;
  const { Compose: GmailDomComposer } = sdk;
  let data = await (getData()) || [];
  Data = data;
  console.log(data);

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
    this.state = { isToggleOn: true, data: Data };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.setRecipents = this.setRecipents.bind(this);
  }

  async getData() {
    let response = await fetch('https://chrome.myprojectstaging.com:3000/api/groups?filter=%7B%22where%22%3A%20%7B%22enduserId%22%3A%221%22%7D%2C%22include%22%3A%5B%22emails%22%5D%7D');
    console.log(response);
    let data = await response.json();
    console.log('got data');
    console.log(data);
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
    return (
      <div>
        <div style={flexContainer}>
          {groupsDataDiv}
        </div>
      </div >
    );
  }
}

InboxSDK.loadScript('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js')
InboxSDK.loadScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js');

// Get an Inbox SDK App Id from here: https://www.inboxsdk.com/register
InboxSDK.load('1.0', 'INBOX_SDK_APP_ID').then(function (sdk) {

  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler(function (composeView) {

    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Vue Pipl Search",
      iconUrl: chrome.extension.getURL('icon.png'),
      onClick: function (event) {

        sdk.Widgets.showModalView({
          title: 'Google Chrome Extension',
          'el': `<div id="vue-pipl-search"></div>`,
        });

        const vuePiplSearch = new Vue({
          el: '#vue-pipl-search',
          template: `
            <div>
            <button v-on:click="setRecipents(recipients)">set Recipents</button>
            <button v-on:click="setTemplate(template)">set Template</button>
            </div>
          `,

          data() {
            return {
              recipients: ['johndoe@gmail.com', 'mfurqan@123.com', 'chris@123.com'],
              template: "Test Template To be set on Gmail",
            }
          },
          methods: {
            setRecipents: function (recipients) {
              console.log(recipients);
              composeView.setToRecipients(recipients)
            },
            setTemplate: function (template) {
              console.log(template);
              composeView.insertTextIntoBodyAtCursor(template)
            }
          },
          created() {
            // if (this.recipients.length) {
            //   this.loading = true

            //   // Get a Pipl Sample Key here: https://pipl.com/api/demo
            //   axios.get(`https://api.pipl.com/search/v5/?email=${this.recipients[0].emailAddress}&key=[PIPL_SAMPLE_KEY]`)
            //     .then(res => {
            //       if (res.status === 200) {
            //         this.person = res.data.person;
            //         this.loading = false
            //       }
            //     })
            // }
          }
        })
      },
    });
  });
});

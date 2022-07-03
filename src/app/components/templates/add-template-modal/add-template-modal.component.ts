import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';

@Component({
  selector: 'app-add-template-modal',
  templateUrl: './add-template-modal.component.html',
  styleUrls: ['./add-template-modal.component.scss'],
})
export class AddTemplateModalComponent implements OnInit {
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  constructor() {}

  ngOnInit(): void {}
  // called when the editor is created
  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    this.emailEditor.editor.loadDesign({
      counters: {
        u_column: 1,
        u_row: 1,
        u_content_text: 1,
        u_content_heading: 1,
        u_content_button: 1,
      },
      body: {
        id: 'Ua9_ZQVX6u',
        rows: [
          {
            id: 'pr6GqthfPu',
            cells: [1],
            columns: [
              {
                id: 'BtXq2p86gt',
                contents: [
                  {
                    id: 'vwcxyLW192',
                    type: 'text',
                    values: {
                      containerPadding: '10px',
                      anchor: '',
                      textAlign: 'left',
                      lineHeight: '140%',
                      linkStyle: {
                        inherit: true,
                        linkColor: '#0000ee',
                        linkHoverColor: '#0000ee',
                        linkUnderline: true,
                        linkHoverUnderline: true,
                      },
                      hideDesktop: false,
                      displayCondition: null,
                      _meta: {
                        htmlID: 'u_content_text_1',
                        htmlClassNames: 'u_content_text',
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                      text: '<p style="font-size: 14px; line-height: 140%;">This is a new Text block. Change the text.</p>',
                    },
                  },
                  {
                    id: 'a3G_RjqZa1',
                    type: 'heading',
                    values: {
                      containerPadding: '10px',
                      anchor: '',
                      headingType: 'h1',
                      fontFamily: {
                        label: 'Arial',
                        value: 'arial,helvetica,sans-serif',
                      },
                      fontSize: '22px',
                      textAlign: 'left',
                      lineHeight: '140%',
                      linkStyle: {
                        inherit: true,
                        linkColor: '#0000ee',
                        linkHoverColor: '#0000ee',
                        linkUnderline: true,
                        linkHoverUnderline: true,
                      },
                      displayCondition: null,
                      _meta: {
                        htmlID: 'u_content_heading_1',
                        htmlClassNames: 'u_content_heading',
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                      text: 'Hello this is Muhammad Furqan Hussain',
                    },
                  },
                  {
                    id: 'K5eJDeLscY',
                    type: 'button',
                    values: {
                      containerPadding: '10px',
                      anchor: '',
                      href: {
                        name: 'web',
                        attrs: { href: '{{href}}', target: '{{target}}' },
                        values: {
                          href: 'https://www.google.com',
                          target: '_blank',
                        },
                      },
                      buttonColors: {
                        color: '#ffffff',
                        backgroundColor: '#3AAEE0',
                        hoverColor: '#FFFFFF',
                        hoverBackgroundColor: '#3AAEE0',
                      },
                      size: { autoWidth: true, width: '100%' },
                      textAlign: 'center',
                      lineHeight: '120%',
                      padding: '10px 20px',
                      border: {},
                      borderRadius: '4px',
                      displayCondition: null,
                      _meta: {
                        htmlID: 'u_content_button_1',
                        htmlClassNames: 'u_content_button',
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                      text: '<span style="font-size: 14px; line-height: 16.8px;">Click Here</span>',
                      calculatedWidth: 105,
                      calculatedHeight: 37,
                    },
                  },
                ],
                values: {
                  backgroundColor: '',
                  padding: '0px',
                  border: {},
                  _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' },
                },
              },
            ],
            values: {
              displayCondition: null,
              columns: false,
              backgroundColor: '',
              columnsBackgroundColor: '',
              backgroundImage: {
                url: '',
                fullWidth: true,
                repeat: false,
                center: true,
                cover: false,
              },
              padding: '0px',
              anchor: '',
              hideDesktop: false,
              _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' },
              selectable: true,
              draggable: true,
              duplicatable: true,
              deletable: true,
              hideable: true,
            },
          },
        ],
        values: {
          popupPosition: 'center',
          popupWidth: '600px',
          popupHeight: 'auto',
          borderRadius: '10px',
          contentAlign: 'center',
          contentVerticalAlign: 'center',
          contentWidth: '500px',
          fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
          textColor: '#000000',
          popupBackgroundColor: '#FFFFFF',
          popupBackgroundImage: {
            url: '',
            fullWidth: true,
            repeat: false,
            center: true,
            cover: true,
          },
          popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
          popupCloseButton_position: 'top-right',
          popupCloseButton_backgroundColor: '#DDDDDD',
          popupCloseButton_iconColor: '#000000',
          popupCloseButton_borderRadius: '0px',
          popupCloseButton_margin: '0px',
          popupCloseButton_action: {
            name: 'close_popup',
            attrs: {
              onClick:
                "document.querySelector('.u-popup-container').style.display = 'none';",
            },
          },
          backgroundColor: '#e7e7e7',
          backgroundImage: {
            url: '',
            fullWidth: true,
            repeat: false,
            center: true,
            cover: false,
          },
          preheaderText: '',
          linkStyle: {
            body: true,
            linkColor: '#0000ee',
            linkHoverColor: '#0000ee',
            linkUnderline: true,
            linkHoverUnderline: true,
          },
          _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' },
        },
      },
      schemaVersion: 8,
    });
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');
  }

  exportHtml() {
    // this.emailEditor.editor.exportHtml((data) => {
    //   console.log('exportHtml', data);
    //   console.log('exportHtml', data.html);
    // });
    this.emailEditor.editor.saveDesign((data) => {
      console.log('saveDesign', JSON.stringify(data));
    });
    this.emailEditor.editor.exportHtml((data) => {
      console.log('export html', JSON.stringify(data.html));
      console.log('export html', JSON.stringify(data));
    });
  }
}

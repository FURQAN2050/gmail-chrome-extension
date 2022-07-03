import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EmailEditorComponent } from 'angular-email-editor';

@Component({
  selector: 'app-add-templates-modal',
  templateUrl: './add-templates-modal.component.html',
  styleUrls: ['./add-templates-modal.component.scss'],
})
export class AddTemplatesModalComponent implements OnInit {
  usenewEditor = true;
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;

  model: any = {};
  editor: Editor;
  templateRichText: '<b>hello world</b>';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredTemplates: Observable<string[]>;
  templates: any = [];
  allFruits: any = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  success: boolean = false;
  currentUser: any;
  //editor: Editor;
  html: string = '';
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: this.html, disabled: false },
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
    this.emailEditor.editor.remove();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTemplatesModalComponent>,
    private GroupsService: GroupsService,
    private LoginAuthenticationService: LoginAuthenticationService
  ) {
    this.LoginAuthenticationService.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
    });

    if (data) {
      const { template } = data;
      this.model = template;
      this.html = template.html;
      // this.templates = groups.templates;
    }

    this.filteredTemplates = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.templates.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.templates.indexOf(fruit);

    if (index >= 0) {
      this.templates.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.templates.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  upsertTemplate() {
    if (!this.doc.value) {
      alert('please add some line in the template before save');
      return;
    }

    let object: any = {};
    object.name = this.model.name;
    object.enduserId = this.currentUser.id;
    if (this.model.id) object.id = this.model.id;
    object.html = this.doc.value;

    console.log(object);

    this.GroupsService.upsertTemplate(object).then((res) => {
      this.success = true;
      object = {};
      this.model = {};
      this.closeDialog();
    });

    // console.log(object);
    // this.success = true;
    // this.closeDialog();
  }

  closeDialog() {
    if (this.success) {
      this.dialogRef.close({
        success: this.success,
        data: { name: this.model.name, html: this.doc.value },
      });
    } else {
      this.dialogRef.close({
        success: this.success,
      });
    }
  }

  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    console.log(this.model.design);
    if (this.model.design) {
      this.emailEditor.editor.loadDesign(JSON.parse(this.model.design));
    } else {
      this.emailEditor.editor.loadDesign();
    }
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');
  }

  exportHtml() {
    this.emailEditor.editor.saveDesign((design) => {
      let templateDesign = JSON.stringify(design);
      this.emailEditor.editor.exportHtml((html) => {
        let templateHtml = JSON.stringify(html);
        if (!templateHtml) {
          alert('please add some line in the template before save');
          return;
        }

        let object: any = {};
        object.name = this.model.name;
        object.enduserId = this.currentUser.id;
        if (this.model.id) object.id = this.model.id;
        object.html = templateHtml;
        object.design = templateDesign;

        console.log(object);

        this.GroupsService.upsertTemplate(object).then((res) => {
          this.success = true;
          object = {};
          this.model = {};
          location.reload();
        });
      });
    });
  }

  //ngOnInit(): void {}
}

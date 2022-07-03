import { MatDialog } from '@angular/material/dialog';
import { AddEmailsModalComponent } from './add-emails-modal/add-emails-modal.component';
import { GroupsService } from '../../services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmailApi } from 'src/app/shared/sdk';
import { Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EmailsComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['name', 'totalEmails', 'totalTemplates', 'editGroup'];
  expandedElement: any | null;
  addNewEmail = '';
  currentUser: any = null;

  public allTemplates: any[] = [];
  public chipSelectedTemplates: any[] = [];
  public filteredTemplates: Observable<String[]>;

  private allowFreeTextAddTemplate = false;

  public templateControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('templateInput') templateInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialog: MatDialog,
    public GroupsService: GroupsService,
    public authentication: LoginAuthenticationService
  ) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
      this.getGroups(this.currentUser);
      this.getTemplates(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.filteredTemplates = this.templateControl.valueChanges.pipe(
      startWith(null),
      map((templateName) => this.filterOnValueChange(templateName))
    );
  }

  public addTemplate(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddTemplate) {
      // only allowed to select from the filtered autocomplete list
      console.log('allowFreeTextAddTemplate is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matAutocomplete.isOpen) {
      return;
    }

    // Add our template
    const value = event.value;
    if ((value || '').trim()) {
      this.selectTemplateByName(value.trim());
    }

    this.resetInputs();
  }

  getTemplates(user) {
    console.log('get Template Called');
    let filters = {
      where: { enduserId: user.id },
    };
    this.GroupsService.lookupTemplates(filters).then((res) => {
      console.log(res);
      this.allTemplates = res;
    });
  }

  public removeTemplate(template: any): void {
    const index = this.chipSelectedTemplates.indexOf(template);
    if (index >= 0) {
      this.chipSelectedTemplates.splice(index, 1);
      this.resetInputs();
    }
  }

  public templateSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectTemplateByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.templateInput.nativeElement.value = '';
    // clear control value and trigger templateControl.valueChanges event
    this.templateControl.setValue(null);
  }

  private filterOnValueChange(templateName: string | null): String[] {
    let result: String[] = [];

    let allTemplatesLessSelected = this.allTemplates.filter(
      (template) => this.chipSelectedTemplates.indexOf(template) < 0
    );
    if (templateName) {
      result = this.filterTemplate(allTemplatesLessSelected, templateName);
    } else {
      result = allTemplatesLessSelected.map((template) => template.name);
    }
    return result;
  }

  private filterTemplate(templateList: any[], templateName: String): String[] {
    let filteredTemplateList: any[] = [];
    const filterValue = templateName.toLowerCase();
    let templatesMatchingTemplateName = templateList.filter(
      (template) => template.name.toLowerCase().indexOf(filterValue) === 0
    );
    if (templatesMatchingTemplateName.length || this.allowFreeTextAddTemplate) {
      filteredTemplateList = templatesMatchingTemplateName;
    } else {
      filteredTemplateList = templateList;
    }
    return filteredTemplateList.map((template) => template.name);
  }

  private selectTemplateByName(templateName) {
    let foundTemplate = this.allTemplates.filter(
      (template) => template.name == templateName
    );
    if (foundTemplate.length) {
      this.chipSelectedTemplates.push(foundTemplate[0]);
    } else {
      let highestTemplateId = Math.max(
        ...this.chipSelectedTemplates.map((template) => template.id),
        0
      );
      this.chipSelectedTemplates.push({
        name: templateName,
        id: highestTemplateId + 1,
      });
    }
  }

  getGroups(user: any) {
    let filters = {
      where: { enduserId: user.id },
      include: ['emails', 'templates'],
    };
    this.GroupsService.lookupGroups(filters).then((res) => {
      console.log(res);
      this.dataSource = res;
    });
  }

  upsertEmails(event, element) {
    event.stopPropagation();
    console.log(element);
    let dialogRef = this.dialog.open(AddEmailsModalComponent, {
      height: 'auto',
      width: '50vw',
      data: {
        groups: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getGroups(this.currentUser);
      }
    });
  }

  addEmails() {
    let dialogRef = this.dialog.open(AddEmailsModalComponent, {
      height: 'auto',
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getGroups(this.currentUser);
      }
    });
  }

  removeEmail(email, group) {
    console.log(email);
    console.log(group);
    this.GroupsService.deleteGroupEmail(email.id, group.id).then((res) => {
      this.getGroups(this.currentUser);
    });
  }

  addEmail(group) {
    console.log(this.addNewEmail);
    console.log(group);
    console.log(this.currentUser);

    let createEmailPayload = {
      email: this.addNewEmail,
      enduserId: this.currentUser.id,
      nickname: this.addNewEmail,
    };
    //first need to create the email.
    this.GroupsService.upsertEmail(createEmailPayload).then((res) => {
      console.log(res);
      let groupEmailPayload = {
        emailId: res.id,
        groupId: group.id,
        enduserId: this.currentUser.id,
      };
      this.GroupsService.upsertGroupEmailAPI(groupEmailPayload);
      this.getGroups(this.currentUser);
      this.addNewEmail = '';
    });
  }
}

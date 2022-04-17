import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';

@Component({
  selector: 'app-add-emails-modal',
  templateUrl: './add-emails-modal.component.html',
  styleUrls: ['./add-emails-modal.component.scss'],
})
export class AddEmailsModalComponent implements OnInit {
  model: any = {};
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: any = [];
  allFruits: any = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  success: boolean = false;
  currentUser: any;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmailsModalComponent>,
    private GroupsService: GroupsService,
    private LoginAuthenticationService: LoginAuthenticationService
  ) {
    this.LoginAuthenticationService.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
    });
    if (data) {
      const { groups } = data;
      this.model = groups;
      this.emails = groups.emails;
    }
    this.filteredEmails = this.fruitCtrl.valueChanges.pipe(
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
      this.emails.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.emails.indexOf(fruit);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  upsertGroup() {
    console.log(this.emails);
    this.addEmailToGroup();

    return;
    let object = {};
    if (!this?.model?.id) {
      object = {
        name: this.model.name,
        enduserId: this.currentUser.id,
      };
    } else {
      object = this.model;
    }
    console.log(object);
    this.GroupsService.upsertGroup(object).then((res) => {
      this.success = true;
      this.addEmailToGroup();

      object = {};
      this.closeDialog();
    });
  }

  addEmailToGroup() {
    console.log(this.emails);
    let finalPayload = [];
    this.emails.forEach((element) => {
      console.log(element);
    });
  }

  closeDialog() {
    this.dialogRef.close({ success: this.success });
  }

  ngOnInit(): void {}
}

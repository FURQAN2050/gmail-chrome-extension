import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-add-emails-modal',
  templateUrl: './add-emails-modal.component.html',
  styleUrls: ['./add-emails-modal.component.scss']
})
export class AddEmailsModalComponent implements OnInit {
  // @ViewChild('emailInput') emailInput: ElementRef<any>;
isHide: boolean=false
options: string[] = ['One', 'Two', 'Three'];
groupList:any=['Group1','Group2','Group3','Group4','Group5']
emailList:any=[{email:'Shaikhasim@oas.mail'},{email:'rayan@oas.mail'},{email:'shahzain@oas.mail'}]
emails:any[]=[]
// filteredFruits: Observable<string[]>;
fruitCtrl = new FormControl();
  constructor() {
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    // );
   }
  separatorKeysCodes: number[] = [ENTER];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.emails.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();

    // this.fruitCtrl.setValue(null);
  }
  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  ngOnInit(): void {
  }

}

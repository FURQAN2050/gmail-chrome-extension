import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AddEmailsModalComponent } from './add-emails-modal/add-emails-modal.component';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmailsComponent implements OnInit {
  displayedColumns: string[] = ['name','template'];
  expandedElement: PeriodicElement | null | undefined;
  separatorKeysCodes: number[] = [];
  fruitCtrl = new FormControl();
  ListData = [
    {
      emails: 1,
      group: 'Hydrogen',
     
    },
    {
      emails: 2,
      group: 'Helium',
     
    },
    {
      emails: 3,
      group: 'Lithium',
     
    },
    {
      emails: 4,
      group: 'Beryllium',
    },
    {
      emails: 5,
      group: 'Boron',},

    {
      emails: 6,
      group: 'Carbon',
     
    },
    {
      emails: 7,
      group: 'Nitrogen',
     
    },
    {
      emails: 8,
      group: 'Oxygen',
     
    },
    {
      emails: 9,
      group: 'Fluorine',
      
    },
    {
      emails: 10,
      group: 'Neon',
    
    },
  ];
  chipList=[
    {
      name:"Group1",
      id:1,
      
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ],
    
    },
    {
      name:"Group2",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ],
  
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ],
    
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    {
      name:"Group3",
      id:1,
      emails:[
        {
        id:1,
        email:"john@gmail.com"
      }
    ]
    },
    
  ]
  
  remove(){
    console.log(event)
  }
  add(event: MatChipInputEvent){

  }
  chipData=[
    {
      email:"Shaikhasim@oas.mail",
      temp:"Temp1"
    },
    {
      email:"rayan@oas.mail",
      temp:"Temp2"

    },
    {
      email:"Shaikhasim@oas.mail",
      temp:"Temp3"

    },
   
  ]
  constructor(public dialog: MatDialog) { }
  addEmails(){
    this.dialog.open(AddEmailsModalComponent, {
      height:"auto",
      width:"50vw"
      // data: {
      //   animal: 'panda',
      // },
    });
  }
  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

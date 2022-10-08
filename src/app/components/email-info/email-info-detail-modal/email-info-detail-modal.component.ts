import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-email-info-detail-modal',
  templateUrl: './email-info-detail-modal.component.html',
  styleUrls: ['./email-info-detail-modal.component.scss'],
})
export class EmailInfoDetailModalComponent implements OnInit {
  emailData: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailInfoDetailModalComponent>
  ) {
    const { template } = data;
    this.emailData = template ? template : {};
  }

  ngOnInit(): void {}
}

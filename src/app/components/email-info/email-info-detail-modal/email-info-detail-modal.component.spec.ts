import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInfoDetailModalComponent } from './email-info-detail-modal.component';

describe('EmailInfoDetailModalComponent', () => {
  let component: EmailInfoDetailModalComponent;
  let fixture: ComponentFixture<EmailInfoDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInfoDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInfoDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDirectoriesComponent } from './email-directories.component';

describe('EmailDirectoriesComponent', () => {
  let component: EmailDirectoriesComponent;
  let fixture: ComponentFixture<EmailDirectoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDirectoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

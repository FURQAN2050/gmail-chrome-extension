import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertEmailModalComponent } from './upsert-email-modal.component';

describe('UpsertEmailModalComponent', () => {
  let component: UpsertEmailModalComponent;
  let fixture: ComponentFixture<UpsertEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertEmailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

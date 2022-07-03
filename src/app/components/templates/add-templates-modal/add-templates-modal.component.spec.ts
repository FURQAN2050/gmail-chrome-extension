import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplatesModalComponent } from './add-templates-modal.component';

describe('AddTemplatesModalComponent', () => {
  let component: AddTemplatesModalComponent;
  let fixture: ComponentFixture<AddTemplatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTemplatesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

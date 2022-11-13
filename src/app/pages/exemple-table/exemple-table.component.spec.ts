import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleTableComponent } from './exemple-table.component';

describe('ExempleTableComponent', () => {
  let component: ExempleTableComponent;
  let fixture: ComponentFixture<ExempleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExempleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExempleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRecruterComponent } from './dash-recruter.component';

describe('DashRecruterComponent', () => {
  let component: DashRecruterComponent;
  let fixture: ComponentFixture<DashRecruterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRecruterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRecruterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

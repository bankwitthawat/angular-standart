import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRolesComponent } from './report-roles.component';

describe('ReportRolesComponent', () => {
  let component: ReportRolesComponent;
  let fixture: ComponentFixture<ReportRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

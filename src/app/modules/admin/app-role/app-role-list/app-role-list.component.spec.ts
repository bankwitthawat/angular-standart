import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleListViewComponent } from './app-role-list.component';

describe('AppRoleListComponent', () => {
  let component: AppRoleListViewComponent;
  let fixture: ComponentFixture<AppRoleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoleListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

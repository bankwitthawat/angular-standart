import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleItemViewComponent } from './app-role-item.component';

describe('AppRoleItemComponent', () => {
  let component: AppRoleItemViewComponent;
  let fixture: ComponentFixture<AppRoleItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoleItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoleItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

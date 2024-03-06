import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeGroupComponent } from './propose-group.component';

describe('ProposeGroupComponent', () => {
  let component: ProposeGroupComponent;
  let fixture: ComponentFixture<ProposeGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposeGroupComponent]
    });
    fixture = TestBed.createComponent(ProposeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

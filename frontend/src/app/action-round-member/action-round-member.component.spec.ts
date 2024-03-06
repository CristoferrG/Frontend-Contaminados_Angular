import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRoundMemberComponent } from './action-round-member.component';

describe('ActionRoundMemberComponent', () => {
  let component: ActionRoundMemberComponent;
  let fixture: ComponentFixture<ActionRoundMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionRoundMemberComponent]
    });
    fixture = TestBed.createComponent(ActionRoundMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

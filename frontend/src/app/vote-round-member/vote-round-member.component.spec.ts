import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteRoundMemberComponent } from './vote-round-member.component';

describe('VoteRoundMemberComponent', () => {
  let component: VoteRoundMemberComponent;
  let fixture: ComponentFixture<VoteRoundMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteRoundMemberComponent]
    });
    fixture = TestBed.createComponent(VoteRoundMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGameSearchComponent } from './join-game-search.component';

describe('JoinGameSearchComponent', () => {
  let component: JoinGameSearchComponent;
  let fixture: ComponentFixture<JoinGameSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinGameSearchComponent]
    });
    fixture = TestBed.createComponent(JoinGameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchOnlyComponent } from './match-only.component';

describe('MatchOnlyComponent', () => {
  let component: MatchOnlyComponent;
  let fixture: ComponentFixture<MatchOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

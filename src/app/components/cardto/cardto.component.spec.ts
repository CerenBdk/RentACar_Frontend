import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardtoComponent } from './cardto.component';

describe('CardtoComponent', () => {
  let component: CardtoComponent;
  let fixture: ComponentFixture<CardtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexComponent } from './regex.component';

describe('RegexComponent', () => {
  let component: RegexComponent;
  let fixture: ComponentFixture<RegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegexComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

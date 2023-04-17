import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Local1Component } from './local1.component';

describe('Local1Component', () => {
  let component: Local1Component;
  let fixture: ComponentFixture<Local1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Local1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Local1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

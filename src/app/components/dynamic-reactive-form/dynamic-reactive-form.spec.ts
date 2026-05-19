import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReactiveForm } from './dynamic-reactive-form';

describe('DynamicReactiveForm', () => {
  let component: DynamicReactiveForm;
  let fixture: ComponentFixture<DynamicReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicReactiveForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicReactiveForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

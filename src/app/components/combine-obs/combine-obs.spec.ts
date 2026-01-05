import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineObs } from './combine-obs';

describe('CombineObs', () => {
  let component: CombineObs;
  let fixture: ComponentFixture<CombineObs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombineObs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombineObs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

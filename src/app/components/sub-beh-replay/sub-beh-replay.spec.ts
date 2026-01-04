import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBehReplay } from './sub-beh-replay';

describe('SubBehReplay', () => {
  let component: SubBehReplay;
  let fixture: ComponentFixture<SubBehReplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubBehReplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubBehReplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

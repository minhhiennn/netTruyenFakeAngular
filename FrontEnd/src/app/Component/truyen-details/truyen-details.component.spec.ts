import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruyenDetailsComponent } from './truyen-details.component';

describe('TruyenDetailsComponent', () => {
  let component: TruyenDetailsComponent;
  let fixture: ComponentFixture<TruyenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruyenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruyenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

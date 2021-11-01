import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruyenSearchComponent } from './truyen-search.component';

describe('TruyenSearchComponent', () => {
  let component: TruyenSearchComponent;
  let fixture: ComponentFixture<TruyenSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruyenSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruyenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

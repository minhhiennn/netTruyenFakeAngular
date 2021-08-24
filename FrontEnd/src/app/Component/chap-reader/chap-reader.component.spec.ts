import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapReaderComponent } from './chap-reader.component';

describe('ChapReaderComponent', () => {
  let component: ChapReaderComponent;
  let fixture: ComponentFixture<ChapReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

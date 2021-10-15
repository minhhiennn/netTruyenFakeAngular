import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcomicsComponent } from './topcomics.component';

describe('TopcomicsComponent', () => {
  let component: TopcomicsComponent;
  let fixture: ComponentFixture<TopcomicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopcomicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopcomicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

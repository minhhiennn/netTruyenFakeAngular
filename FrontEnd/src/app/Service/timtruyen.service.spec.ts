import { TestBed } from '@angular/core/testing';

import { TimtruyenService } from './timtruyen.service';

describe('TimtruyenService', () => {
  let service: TimtruyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimtruyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

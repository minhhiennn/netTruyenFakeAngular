import { TestBed } from '@angular/core/testing';

import { LeechMangaService } from './leech-manga.service';

describe('LeechMangaService', () => {
  let service: LeechMangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeechMangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

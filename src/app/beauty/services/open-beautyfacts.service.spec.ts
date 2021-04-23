import { TestBed } from '@angular/core/testing';

import { OpenBeautyfactsService } from './open-beautyfacts.service';

describe('OpenBeautyfactsService', () => {
  let service: OpenBeautyfactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenBeautyfactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

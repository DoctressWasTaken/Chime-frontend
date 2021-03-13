import { TestBed } from '@angular/core/testing';

import { StatsManagerService } from './stats-manager.service';

describe('StatsManagerService', () => {
  let service: StatsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

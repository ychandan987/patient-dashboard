import { TestBed, inject } from '@angular/core/testing';

import { CryptService } from './crypt.service';

describe('CryptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptService]
    });
  });

  it('should be created', inject([CryptService], (service: CryptService) => {
    expect(service).toBeTruthy();
  }));
});

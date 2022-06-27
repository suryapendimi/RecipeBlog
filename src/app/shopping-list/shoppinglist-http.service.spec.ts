import { TestBed } from '@angular/core/testing';

import { ShoppinglistHttpService } from './shoppinglist-http.service';

describe('ShoppinglistHttpService', () => {
  let service: ShoppinglistHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

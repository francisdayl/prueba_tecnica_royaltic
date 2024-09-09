import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { adminProductResolver } from './admin-product.resolver';

describe('adminProductResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => adminProductResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

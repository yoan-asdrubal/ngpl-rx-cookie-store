import {NgplRxCookieStoreService} from './ngpl-rx-cookie-store.service';
import {MockCookieService} from './mock-cookie-service';
import {tap} from 'rxjs/operators';

describe('NgplRxCookieStoreService', () => {
  let service: NgplRxCookieStoreService;
  let key;
  let value;
  beforeEach(() => {
    key = 'key_test';
    value = {a: 'A Value', b: 'B Value'};
    service = new NgplRxCookieStoreService(new MockCookieService() as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null', () => {
    expect(service.getValue(key)).toEqual(null);
  });

  it('should return current value', () => {
    service.setValue(key, value);
    expect(service.getValue(key)).toEqual(value);
  });

  it('should emit value changes', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
        })
      )
      .subscribe();
    service.setValue(key, value);
    expect(service.getValue(key)).toEqual(value);

    service.valueChanges(key + '1')
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
          done();
        })
      )
      .subscribe();
    service.setValue(key + '1', value);

  });


  it('should set value by domain', () => {
    service.setValue(key, value, 'domain.com');
    expect(service.getValue(key)).toEqual(value);
  });

  it('should emit null when delete cookie', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toBeFalsy();
          done();
        })
      )
      .subscribe();
    service.delete(key);
  });

  it('should emit null when delete cookie with domain', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toBeFalsy();
          done();
        })
      )
      .subscribe();
    service.delete(key, 'domain.com');
  });

});

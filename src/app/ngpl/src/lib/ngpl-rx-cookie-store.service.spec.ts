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
    expect(service.get(key)).toEqual(null);
  });

  it('should return current value', () => {
    service.set(key, value);
    expect(service.get(key)).toEqual(value);
  });

  it('should emit value changes', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
        })
      )
      .subscribe();
    service.set(key, value);
    expect(service.get(key)).toEqual(value);

    service.valueChanges(key + '1')
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
          done();
        })
      )
      .subscribe();
    service.set(key + '1', value);

  });


  it('should set value by domain', () => {
    service.set(key, value, {domain: 'domain.com'});
    expect(service.get(key)).toEqual(value);
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


  it('should return all values', () => {
    service.set('key1', 1);
    service.set('key2', 2);
    service.set('key3', 3);
    expect(service.getAll()).toEqual({key1: 1, key2: 2, key3: 3});
  });

  it('should emit null value when delete  all', done => {
    service.set('key1', 1);
    service.set('key2', 2);
    service.set('key3', 3);
    expect(service.get('key1')).toEqual(1);

    service.valueChanges('key1')
      .pipe(
        tap((val: any) => {
          expect(val).toBeNull();
          done();
        })
      )
      .subscribe();
    service.deleteAll();

  });
});

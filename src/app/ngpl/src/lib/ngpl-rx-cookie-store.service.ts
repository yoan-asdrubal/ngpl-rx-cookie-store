import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export interface NgplValueChangeEvent {
  key: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class NgplRxCookieStoreService {
  private value: Subject<NgplValueChangeEvent> = new Subject();

  private value$: Observable<NgplValueChangeEvent> = this.value.asObservable();

  domain = null;

  constructor(private cookieService: CookieService) {
  }

  valueChanges(key): Observable<any> {
    if (!key) {
      return EMPTY;
    }
    return this.value$
      .pipe(
        filter((event: NgplValueChangeEvent) => !event || event.key === key),
        map((event: NgplValueChangeEvent) => !event ? null : event.value)
      );
  }

  setDomain(domain): void {
    this.domain = domain;
  }

  get(key: string, defaultValue = null): any {
    const p = this.cookieService.get(key);
    return !!p ? JSON.parse(p) : defaultValue;
  }

  set(key: string, value: any, options = null): void {
    this.cookieService.set(key, JSON.stringify(value), options);
    this.value.next({key, value});
  }

  delete(key: string, domain = this.domain): void {
    this.cookieService.delete(key, domain);
    this.value.next({key, value: null});
  }

  getAll(): any {
    return this.cookieService.getAll();
  }

  deleteAll(): void {
    const all = this.getAll();
    Object.keys(all)
      .forEach(key => {
        this.delete(key);
        this.value.next({key, value: null});
      });
  }
}

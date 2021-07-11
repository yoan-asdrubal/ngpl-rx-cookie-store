export class MockCookieService {
  values = {};

  get(key): any {
    return this.values[key];
  }

  set(name, value): void {
    this.values[name] = value;
  }

  delete(name): void {
    delete this.values[name];
  }

  getAll(): any {
    return this.values;
  }

  deleteAll(): void {
    this.values = {};
  }
}

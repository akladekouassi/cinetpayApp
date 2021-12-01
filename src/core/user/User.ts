export class User {
  private _firstName: string;
  private _lastName: string;

  constructor(firsName: string, lastName: string) {
    this._firstName = firsName;
    this._lastName = lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(newFirstName: string) {
    this._firstName = newFirstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(newLastName: string) {
    this._lastName = newLastName;
  }
}

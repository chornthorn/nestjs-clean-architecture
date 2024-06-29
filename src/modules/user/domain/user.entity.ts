export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly id?: string,
    public readonly password?: string | null,
  ) {}
}

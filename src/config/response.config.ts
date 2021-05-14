export class ResponseEnum {
  static readonly SUCCESS = new ResponseEnum(0, 'onboarding.MESSAGES.SUCCESS');
  static readonly ERROR = new ResponseEnum(-1, 'onboarding.MESSAGES.ERROR');
  static readonly FAILED_AUTHENTICATION = new ResponseEnum(
    -2,
    'onboarding.MESSAGES.FAILED_AUTHENTICATION',
  );

  static readonly NO_RECORDS_FOUND = new ResponseEnum(
    -10,
    'onboarding.MESSAGES.NO_RECORDS_FOUND',
  );

  static readonly UNAUTHORISED = new ResponseEnum(
    -3,
    'onboarding.MESSAGES.UNAUTHORISED',
  );

  static readonly UNAUTHORISED_TOKEN = new ResponseEnum(
    -3,
    'onboarding.MESSAGES.UNAUTHORISED_TOKEN',
  );

  // private to disallow creating other instances of this type
  private constructor(
    private readonly key: number,
    private readonly value: string,
  ) {}

  get code(): number {
    return this.key;
  }

  get description(): string {
    return this.value;
  }
}

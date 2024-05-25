export enum Status {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  METHOD_NOT_ALLOWED = 405,
  GATEWAY_TIMEOUT = 504
}

export enum GoalType {
  PERFORMANCE = 'performance',
  DISTANT = 'distant',
  SOON = 'soon',
  RESULT = 'result',
  LEARNING = 'learning'
}

export enum RewardType {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big'
}

export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum MotivationType {
  PER_USER = 'per user',
  PER_GOAL = 'per goal'
}

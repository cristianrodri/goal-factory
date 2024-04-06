export enum Status {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  GATEWAY_TIMEOUT = 504
}

export enum GOALTYPE {
  PERFORMANCE = 'Performance',
  DISTANT = 'Distant',
  SOON = 'Soon',
  RESULT = 'Result',
  LEARNING = 'Learning'
}

export enum REWARD {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  BIG = 'Big'
}

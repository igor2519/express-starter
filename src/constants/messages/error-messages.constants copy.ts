export default {
  invalidRequest: 'Invalid request',
  notExist: (item: string) => `${item} does not exists`,
  alreadyExist: (item: string) => `${item} already exists`,
  unauthorized: 'Unauthorized',
  forbidden: 'Forbidden',
  internalError: 'Internal server error',
  invalidLogin: 'Email or password is invalid.',
  invalidAuthorizationToken: 'Invalid authorization token.',
  unverifiedLogin: 'We just sent you a verification email. Please open a link you receive to verify email address.',
  blockedLogin: 'This account is blocked. Please contact support team for more details.',
  linkExpired: 'Link expired',
};

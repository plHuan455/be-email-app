export class SystemNotReadyError extends Error {
  constructor() {
    super('System is not ready');
    this.name = 'SYSTEM_NOT_READY';
  }
}

export class NotAllowedType extends Error {
  constructor() {
    super('Message type is not allowed');
    this.name = 'NOT_ALLOWED_TYPE';
  }
}

export class RequestPermissionFailed extends Error {
  constructor() {
    super('Access is denied');
    this.name = 'REQUEST_PERMISSION_FAILED';
  }
}

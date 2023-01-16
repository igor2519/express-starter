import type { UserRole } from 'enums';

export interface IUserCreateRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IUserUpdateRequest {
  fullName?: string;
  email?: string;
  password?: string;
}

import type { UserRole } from 'enums';

export interface IRequestUser {
  id: string;
  role: UserRole;
}

export interface IAppFile {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: object;
  size: number;
  name: string;
  type: string;
}

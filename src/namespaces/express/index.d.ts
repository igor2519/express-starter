declare namespace Express {
  import type IAppFile from '../../types/token/IAppFile';
  import type IRequestUser from '../../types/token/IRequestUser';

  interface Request {
    user: IRequestUser;
    files: { file: IAppFile[] };
  }
}

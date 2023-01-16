import type { IUserPopulated } from '@database';
import type { IUserResponse } from '@types';

const createFullUserDto = (user: IUserPopulated): IUserResponse => {
  const { password, ...result } = user.get() as IUserPopulated;
  return {
    ...result,
  };
};

const createFullUserDtoArr = (users: IUserPopulated[]): IUserResponse[] => users.map((item) => createFullUserDto(item));

const userDtoCreators = {
  createFullUserDtoArr,
  createFullUserDto,
};

export default userDtoCreators;

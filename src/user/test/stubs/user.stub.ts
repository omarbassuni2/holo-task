import { UserInterface } from 'src/user/user.model';

export const userStub = (): UserInterface => {
  return {
    name: 'omar1',
    email: 'omar1@gmail.com',
  };
};

export const secondUserStub = (): UserInterface => {
  return {
    name: 'omar2',
    email: 'omar2@gmail.com',
  };
};

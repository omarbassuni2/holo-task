import { userStub } from '../test/stubs/user.stub';
export const UserService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub),
  getAllUsers: jest.fn().mockResolvedValue([userStub]),
});

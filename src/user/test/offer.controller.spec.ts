import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserInterface } from '../user.model';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let user: UserInterface[];

      beforeEach(async () => {
        user = await userController.getUsers();
      });

      test('then it should be called with', () => {
        expect(userService.getAllUsers).toBeCalledWith();
      });

      test('then it should return user', () => {
        expect(user).toEqual([userStub]);
      });
    });
  });

  describe('addUser', () => {
    describe('when addUser is called', () => {
      let user: UserInterface;
      beforeEach(async () => {
        user = {
          name: userStub().name,
          email: userStub().email,
        };
        await userController.addUser(user);
      });
      test('then  it should call user service', () => {
        expect(userService.createUser).toBeCalledWith(user);
      });
      test('then  it should return user', () => {
        expect(userService.createUser).toBeCalledWith(user);
      });
    });
  });
});

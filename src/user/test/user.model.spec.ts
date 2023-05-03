import { Test } from '@nestjs/testing';
import { UserModule } from '../user.module';
import { Connection } from 'mongoose';
import { UserService } from '../user.service';
import { DatabaseService } from '../../database/database.service';
import { userStub } from './stubs/user.stub';
import { AppModule } from '../../app.module';
import { UserInterface } from '../user.model';

describe('UserModel', () => {
  let dbConnection: Connection;
  let userService: UserService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });
  afterAll(async () => {
    await dbConnection.collection('users').deleteMany({});
    await dbConnection.close();
  });
  describe('when createUser gets called', () => {
    it('then It should create user', async () => {
      const result = await userService.createUser(userStub());
      expect(result).toMatchObject(userStub());
    });
    it('then It should reject creating user that inputs non-valid email', async () => {
      const badUserStub: UserInterface = {
        name: 'omar1',
        email: 'omar1.com',
      };
      await expect(userService.createUser(badUserStub)).rejects.toThrow();
    });
    it('then It should reject creating user that inputs non-unique email', async () => {
      await expect(userService.createUser(userStub())).rejects.toThrow();
    });
  });

  describe('when getAllUsers gets called', () => {
    it('then It should return users in database', async () => {
      const result = await userService.getAllUsers();
      expect(result).toMatchObject([userStub()]);
    });
  });
});

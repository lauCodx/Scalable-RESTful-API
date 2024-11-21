import { userStub } from "../test/stubs/user.stub";
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signUpDto';
import { error } from "console";

export const UserService = jest.fn().mockReturnValue({

  createUser:jest.fn().mockResolvedValue(userStub()),
  signInUser: jest.fn().mockResolvedValue(userStub())
});

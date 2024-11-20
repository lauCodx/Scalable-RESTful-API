import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../__mocks__/auth.service.mock';
import { SignUpDto } from '../dto/signUpDto';
import { userStub } from './stubs/user.stub';
import { Response } from 'express';


jest.mock('../__mocks__/auth.service.mock');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, {
        provide:AuthService,
        useValue: UserService()
      }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('{POST} /users/register', () =>{
    test('should sign up a user and return a success response 201', async()=>{
      const signUpDto: SignUpDto = {
        username: 'example',
        email:'example@gmail.com',
        password:'12345',
        confirmPassword:'12345'
      };

      const mockUser = userStub();
      (authService.createUser as jest.Mock).mockResolvedValue(mockUser)

      const response = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
      } as unknown as Response;

      await authController.signUp(signUpDto, response);

      expect(authService.createUser).toHaveBeenCalledWith(signUpDto);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        status:'success',
        message:'Created User successfully',
        user: mockUser
      })
    })
  })
});

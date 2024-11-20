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
    describe('should sign up a user and return a success response', ()=>{
      const signUpDto: SignUpDto = {
        username: 'example',
        email:'example@gmail.com',
        password:'12345',
        confirmPassword:'12345'
      };

      const mockUser = userStub();
      beforeAll(() =>{
        (authService.createUser as jest.Mock).mockResolvedValue(mockUser)
      })

      const response = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
      } as unknown as Response;
      
    

      test('it should create user successfully', async()=>{
        await authController.signUp(signUpDto, response);
        expect(authService.createUser).toHaveBeenCalledWith(signUpDto);
      })

      test('it should return a status code of 201', async ()=>{
        await authController.signUp(signUpDto, response);
        expect(response.status).toHaveBeenCalledWith(201);
      })

      test('it should return a json value', async ()=>{
        await authController.signUp(signUpDto, response); 
        expect(response.json).toHaveBeenCalledWith({
          status:'success',
          message:'Created User successfully',
          user: mockUser
        })
      })
    })
  })
});

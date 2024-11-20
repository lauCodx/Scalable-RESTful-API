import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signInDto';
import { User } from './schema/user.schema';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp (@Body() signUpDto: SignUpDto): Promise<User>{
    return this.authService.createUser(signUpDto)
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<any>{
    return this.authService.signInUser(signInDto)
  }
}

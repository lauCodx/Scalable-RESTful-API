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

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp (@Body() signUpDto: SignUpDto){
    return this.authService.createUser(signUpDto)
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto){
    return this.authService.signInUser(signInDto)
  }
}

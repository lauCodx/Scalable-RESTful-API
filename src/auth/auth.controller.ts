import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signInDto';
import { User } from './schema/user.schema';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp (@Body() signUpDto: SignUpDto, @Res() res:Response): Promise<User | any>{
    const result = await this.authService.createUser(signUpDto)
    return res.status(201).json({
      status:'success',
      message: 'Created User successfully',
      user:result
    })
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res:Response): Promise<any>{
    const result = await this.authService.signInUser(signInDto)
    return res.status(200).json(result)
  }
}

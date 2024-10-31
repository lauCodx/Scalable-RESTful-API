import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signUpDto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signInDto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>, private jwtService: JwtService) {}

  async createUser (signUpDto:SignUpDto){

    const {email, password, confirmPassword, username} = signUpDto;

    if(!(password===confirmPassword)){
      throw new BadRequestException('Password and confirm password do not match')
    }
    const find = await this.UserModel.findOne({email:email.toLowerCase()})
    if (find){
      throw new BadRequestException("User with this email already exist")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await this.UserModel.create({
      email,
      username,
      password:hashPassword
    })

    return user;
  };

  async signInUser(signInDto:SignInDto){
    const {email, password} = signInDto;
    const find = await this.UserModel.findOne({email: email});
    if(!find){
      throw new NotFoundException('User with this email is not found!')
    };

    const passwordMatch = await bcrypt.compare(password, find.password);
    if(!passwordMatch){
      throw new BadRequestException('Email or Password not correct')
    };

    const accessToken = this.jwtService.sign({_id:find._id, email: find.email}, {expiresIn:'1h'});

    return {accessToken:accessToken};
  }




}

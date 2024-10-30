import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUpDto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

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
  }
}

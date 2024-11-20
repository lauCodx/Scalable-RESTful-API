import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from './middleware/authGuard';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(@Req() req:any) {
    return {message: 'This is a protected route', user: req.user }
  }
}

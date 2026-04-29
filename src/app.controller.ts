import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  index() {
    return { titulo: 'Sistema Wash 1.0' };
  }
}

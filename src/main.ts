import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as expressLayouts from 'express-ejs-layouts';
import { formatarData, formatarMoeda } from './helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração de assets estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Configuração de views EJS
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Layout padrão
  app.use(expressLayouts);
  app.set('layout', 'layouts/main');

  // Helpers disponíveis nas views
  app.set('locals', {
    formatarData,
    formatarMoeda,
  });

  await app.listen(3000);
  console.log('Sistema Wash rodando em http://localhost:3000');
}
bootstrap();

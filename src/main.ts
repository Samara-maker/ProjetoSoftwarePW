import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { registerHelpers } from './helpers';
import { buildValidationErrorPayload } from 'nest-validation-view';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new BadRequestException(buildValidationErrorPayload(errors)),
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // SEM express-ejs-layouts — views incluem header/footer diretamente (igual à Samara)
  registerHelpers(app.getHttpAdapter().getInstance());

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () =>
    Logger.log(
      `Aplicação rodando em http://localhost:${port}`,
      'NestExpressApplication',
    ),
  );
}
bootstrap();

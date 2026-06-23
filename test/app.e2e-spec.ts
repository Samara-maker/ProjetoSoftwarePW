import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) deve responder com sucesso', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/clientes (GET) deve responder com sucesso', () => {
    return request(app.getHttpServer()).get('/clientes').expect(200);
  });
});

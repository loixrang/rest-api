import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import "dotenv/config"
import { AppModule, ObserveInstrument } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.enableCors()
  app.setGlobalPrefix('/api/v1')
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

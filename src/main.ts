import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc.options';
import { Logger } from './shared/services';
import { LoggingInterceptor } from './shared';
import { ROOT_LOGGER } from '@eropple/nestjs-bunyan';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    ...grpcClientOptions,
    logger: new Logger(),
  });
  const rootLogger = app.get(ROOT_LOGGER);
  app.useGlobalInterceptors(new LoggingInterceptor(rootLogger));
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
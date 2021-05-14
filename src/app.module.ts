import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { OnboardingModule } from './onboarding/onboarding.module';
import { TrackerModule } from './tracker/tracker.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';
import { I18nTranslate } from './util/i18n-translate';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    OnboardingModule,
    TrackerModule,
    TerminusModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [I18nTranslate],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('Onboarding', 'tracker');
  }
}

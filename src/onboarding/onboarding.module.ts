import { OnboardingItemRepository } from './onboarding.repository';
import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nTranslate } from 'src/util/i18n-translate';
import { TrackerModule } from 'src/tracker/tracker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OnboardingItemRepository]),
    TrackerModule,
  ],
  providers: [OnboardingService, I18nTranslate],
  controllers: [OnboardingController],
})
export class OnboardingModule {}

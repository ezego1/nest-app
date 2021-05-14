import { I18nTranslate } from './../util/i18n-translate';
import { OnboardingService } from './onboarding.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';

describe('OnboardingController', () => {
  let controller: OnboardingController;

  const mockOnboardingService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [OnboardingService, I18nTranslate],
    })
      .overrideProvider(OnboardingService)
      .useValue(mockOnboardingService)
      .compile();

    controller = module.get<OnboardingController>(OnboardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { TrackerDTO } from './../tracker/dto/tracker.dto';
import { TrackerService } from 'src/tracker/tracker.service';
import { OnboardingItemDto } from './dto/onboarding-item.dto';
import { I18nTranslate } from './../util/i18n-translate';
import { OnboardingService } from './onboarding.service';
import { Controller, Get, Post, Req } from '@nestjs/common';
import ExtendedRequest from 'src/interface/extended-request';
import { customResponse } from '../util/custom-response';
import { ResponseEnum } from '../config/response.config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('onboarding-item')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private onboardingService: OnboardingService,
    private i18nTranslateUtil: I18nTranslate,
    private readonly trackerService: TrackerService,
  ) {}

  @ApiOkResponse({ type: [OnboardingItemDto] })
  @Get()
  async getOnboardingItems(@Req() request: ExtendedRequest) {
    const { userIdentityCompositeKey, acceptLanguageCode, user } = request;

    const builder = await this.trackerService.queryBuilder('track');

    const tracker = builder.where('track.user_fk = :id', { id: user.id });

    if (tracker) {
      return customResponse(
        ResponseEnum.SUCCESS.code,
        await this.i18nTranslateUtil.translate(
          ResponseEnum.SUCCESS.description,
          acceptLanguageCode,
        ),
        tracker,
      );
    }

    const onboardItems = await this.onboardingService.getOnboardingItems(
      userIdentityCompositeKey.currentUserType,
    );

    const userTracker = [];
    let trackerEntity: TrackerDTO;

    for (const entity of onboardItems) {
      trackerEntity.user = user.id;
      trackerEntity.onboardingItem = entity.id;
      trackerEntity.itemCompleted = false;
      trackerEntity.company = userIdentityCompositeKey.currentOrg;
      trackerEntity.active = true;
      userTracker.push(trackerEntity);
    }

    await this.trackerService.createTracker(userTracker);

    return customResponse(
      ResponseEnum.SUCCESS.code,
      await this.i18nTranslateUtil.translate(
        ResponseEnum.SUCCESS.description,
        acceptLanguageCode,
      ),
      onboardItems,
    );
  }
}

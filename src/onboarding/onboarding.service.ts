import { OnboardingItemRepository } from './onboarding.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnboardingItemDto } from './dto/onboarding-item.dto';
import { TrackerService } from 'src/tracker/tracker.service';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingItemRepository)
    private onboardingItemRepo: OnboardingItemRepository,
    private trackerService: TrackerService,
  ) {}

  async getOnboardingItems(
    currentUserType: string,
  ): Promise<OnboardingItemDto[]> {
    return this.onboardingItemRepo.find({
      where: { userType: currentUserType },
    });
  }

  async isCreated(onboardingItemId: string, userId: string) {
    return await this.trackerService.isCompleted(onboardingItemId, userId);
  }
}

import { TrackerRepository } from './tracker.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackerDTO } from './dto/tracker.dto';

@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(TrackerRepository) private trackerRepo: TrackerRepository,
  ) {}

  async getTracker() {
    return await this.trackerRepo.find();
  }

  async createTracker(data): Promise<TrackerDTO> {
    return await this.trackerRepo.save(data);
  }

  async isItemCompleted(onboardingItemId: string) {
    return await this.trackerRepo.findOneOrFail(onboardingItemId);
  }

  async isCompleted(onboardingItemId: string, userId: string) {
    let completed = false;

    const onboardingItem = await this.trackerRepo
      .createQueryBuilder('onboarding')
      .where(
        'onboarding.onboarding_item_fk = :onboardingItemId AND onboarding.user_fk = :user_fk ',
        { onboardingItemId, user_fk: userId },
      )
      .getOne();

    if (onboardingItem) {
      completed = true;
    }

    return completed;
  }

  queryBuilder(alias: string) {
    return this.trackerRepo.createQueryBuilder(alias);
  }
}

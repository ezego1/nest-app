import { OnboardingTracker } from 'sasp-node-model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OnboardingTracker)
export class TrackerRepository extends Repository<OnboardingTracker> {}

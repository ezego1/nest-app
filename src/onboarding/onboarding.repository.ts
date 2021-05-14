import { EntityRepository, Repository } from 'typeorm';
import { OnboardingItem } from 'sasp-node-model';

@EntityRepository(OnboardingItem)
export class OnboardingItemRepository extends Repository<OnboardingItem> {}

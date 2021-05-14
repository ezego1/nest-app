import { TrackerService } from '../tracker/tracker.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackerController } from './tracker.controller';

describe('TrackerController', () => {
  let controller: TrackerController;

  const dto = {
    id: 'wale',

    itemCompleted: false,

    dateCompleted: new Date(),

    company: 'Decagon',

    user: 'money',

    onboardingItem: 'magic',

    active: false,

    deleted: false,

    dateCreated: new Date(),

    lastModified: new Date(),
  };

  const mockTrackerService = {
    getTracker: jest.fn(),

    createTracker: jest.fn((dto) => {
      return {
        ...dto,
      };
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackerController],
      providers: [TrackerService],
    })
      .overrideProvider(TrackerService)
      .useValue(mockTrackerService)
      .compile();

    controller = module.get<TrackerController>(TrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should get tracker from the table', () => {
    expect(controller.createTracker(dto)).toBe(dto);
  });

  expect(mockTrackerService.createTracker).toHaveBeenCalled();
});

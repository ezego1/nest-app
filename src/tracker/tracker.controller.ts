import { TrackerService } from '../tracker/tracker.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrackerDTO } from './dto/tracker.dto';
@ApiTags('onboarding-tracker')
@Controller('tracker')
export class TrackerController {
  constructor(private trackerService: TrackerService) {}
  @Get()
  async getTracker() {
    return await this.trackerService.getTracker();
  }

  @Post()
  async createTracker(@Body() tracker: TrackerDTO) {
    return this.trackerService.createTracker(tracker);
  }

  @Get(':id')
  async isItemCompleted(@Param('id') id: string) {
    return await this.trackerService.isItemCompleted(id);
  }
}

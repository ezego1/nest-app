import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerRepository } from './tracker.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackerRepository])],
  providers: [TrackerService],
  controllers: [TrackerController],
  exports: [TrackerService],
})
export class TrackerModule {}

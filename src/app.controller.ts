import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('sasp-onboarding-services')
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @ApiTags('health')
  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([async () => this.db.pingCheck('typeorm')]);
  }
}

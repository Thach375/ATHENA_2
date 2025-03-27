import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthCheckerController {
  @Get()
  check(): string {
    return 'live';
  }
}

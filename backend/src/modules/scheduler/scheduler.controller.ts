import { Scopes } from '@constants/enum';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorate';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { SchedulerService } from './scheduler.service';

@Controller()
@ApiTags('Scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Auth([Scopes.USER])
  @Get('/scheduler/mentors')
  public async userListBookedMentors(
    @Req() req: any,
    @Query() query: any,
  ): Promise<any> {
    return await this.schedulerService.userListBookedMentors(
      req.user.id,
      query,
    );
  }

  @Auth([Scopes.USER])
  @Post('/scheduler/create')
  public async createScheduler(
    @Req() req: any,
    @Body() body: CreateSchedulerDto,
  ): Promise<any> {
    return await this.schedulerService.createScheduler(req.user.id, body);
  }

  @Auth([Scopes.USER])
  @Get('/scheduler/mentor/:mentorId/history')
  public async userGetSchedulerHistory(
    @Req() req: any,
    @Param('mentorId') mentorId: string,
  ): Promise<any> {
    return await this.schedulerService.userGetSchedulerHistory(
      req.user.id,
      mentorId,
    );
  }

  @ApiQuery({
    name: 'sort',
    description: 'sort: {key}:{direction}. direction allow: asc, desc',
    required: false,
  })
  @ApiQuery({ name: 'userEmail', description: "User's email", required: false })
  @ApiQuery({
    name: 'status',
    description: 'Scheduler status',
    required: false,
  })
  @ApiQuery({
    name: 'requestStartDate',
    description: 'Request start date',
    required: false,
  })
  @ApiQuery({
    name: 'requestEndDate',
    description: 'Request end date',
    required: false,
  })
  @Auth([Scopes.ADMIN])
  @Get('/admin/schedulers')
  public async adminListSchedulers(@Query() query: any): Promise<any> {
    return await this.schedulerService.adminListSchedulers(query);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/scheduler/:id/approve')
  public async adminApproveScheduler(@Param('id') id: string): Promise<any> {
    return await this.schedulerService.adminApproveScheduler(id);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/scheduler/:id/cancel')
  public async adminCancelScheduler(@Param('id') id: string): Promise<any> {
    return await this.schedulerService.adminCancelScheduler(id);
  }

  @Auth([Scopes.ADMIN])
  @Post('/admin/scheduler/meet')
  public async createMeetSession(@Body() body: CreateMeetingDto): Promise<any> {
    return await this.schedulerService.createMeetSession(body);
  }
}

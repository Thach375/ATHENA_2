import { Scopes } from '@constants/enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorate';
import { IsValidObjectId } from 'src/pipes/object-id.pipe';
import { InsertMentorDto } from './dto/insert-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { MentorService } from './mentor.service';
import { InsertMentorCalendarDto } from './dto/insert-mentor-calendar.dto';
import { UpdateMentorCalendarDto } from './dto/update-mentor-calendar.dto';

@Controller()
@ApiTags('Mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Auth([Scopes.ADMIN])
  @Post('/admin/mentor/:id/calendar')
  public async adminInsertCalendar(
    @Param('id') id: string,
    @Body() body: InsertMentorCalendarDto,
  ): Promise<any> {
    return await this.mentorService.adminInsertCalendar(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/mentor/calendar/:id')
  public async adminUpdateCalendar(
    @Param('id') id: string,
    @Body() body: UpdateMentorCalendarDto,
  ): Promise<any> {
    return await this.mentorService.adminUpdateCalendar(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/mentor/calendar/:id')
  public async adminDeleteCalendar(@Param('id') id: string): Promise<any> {
    return await this.mentorService.adminDeleteCalendar(id);
  }

  @Auth([Scopes.ADMIN])
  @Post('/admin/mentor')
  public async adminInsertMentor(@Body() body: InsertMentorDto): Promise<any> {
    return await this.mentorService.adminInsertMentor(body);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/mentor/:id')
  public async adminUpdateMentor(
    @Param('id', IsValidObjectId) id: string,
    @Body() body: UpdateMentorDto,
  ): Promise<any> {
    return await this.mentorService.adminUpdateMentor(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/mentor/:id')
  public async adminDeteleMentor(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.mentorService.adminRemoveMentor(id);
  }

  @ApiQuery({ name: 'name', description: 'name', required: false })
  @ApiQuery({ name: 'page', description: 'page', required: false })
  @ApiQuery({ name: 'limit', description: 'page size', required: false })
  @ApiQuery({ name: 'major', description: 'major', required: false })
  @Auth([Scopes.ADMIN])
  @Get('/admin/mentors')
  public async adminListMentor(@Query() query: any): Promise<any> {
    return await this.mentorService.adminListMentor(query);
  }

  @ApiQuery({ name: 'name', description: 'name', required: false })
  @ApiQuery({ name: 'page', description: 'page', required: false })
  @ApiQuery({ name: 'limit', description: 'page size', required: false })
  @ApiQuery({ name: 'major', description: 'major', required: false })
  @Auth([Scopes.USER], { ignoreToken: true })
  @Get('/user/mentors')
  public async userListMentor(@Query() query: any): Promise<any> {
    return await this.mentorService.userListMentor(query);
  }

  @Auth([Scopes.USER])
  @Get('/user/mentor/:id')
  public async userDetailMentor(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.mentorService.userDetailMentor(id);
  }
}

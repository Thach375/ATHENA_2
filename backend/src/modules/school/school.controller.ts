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
  Req,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorate';
import { InsertSchoolDto } from './dto/insert-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolService } from './school.service';
import { IsValidObjectId } from 'src/pipes/object-id.pipe';
import { Request } from 'express';

@Controller()
@ApiTags('School')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/majors')
  public async userListMajors(): Promise<any> {
    return await this.schoolService.userListMajors();
  }

  @Get('/schools')
  public async listAllSchools(): Promise<any> {
    return await this.schoolService.listAllSchools();
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({
    name: 'minCost',
    required: false,
    description: 'min cost to filter',
  })
  @ApiQuery({
    name: 'maxCost',
    required: false,
    description: 'max cost to filter',
  })
  @ApiQuery({
    name: 'minScholarship',
    required: false,
    description: 'min scholarship to filter',
  })
  @ApiQuery({
    name: 'maxScholarship',
    required: false,
    description: 'max scholarship to filter',
  })
  @ApiQuery({
    name: 'major',
    required: false,
  })
  @ApiQuery({
    name: 'scholarship',
    description: '1 is have scholarship, 0 else',
    required: false,
  })
  @ApiQuery({
    name: 'country',
    description: 'allow us, uk, ca',
    required: false,
  })
  @Auth([Scopes.USER], { ignoreToken: true })
  @Get('/user/schools')
  public async userListSchool(
    @Req() req: any,
    @Query() query: any,
  ): Promise<any> {
    return await this.schoolService.userListSchool(query, req.user?.id);
  }

  @Auth([Scopes.USER])
  @Get('/user/school-chances')
  public async userListSchoolChances(
    @Req() req: Request & { user: { id: string } },
  ): Promise<any> {
    return await this.schoolService.userListSchoolChances(req.user.id);
  }

  @Auth([Scopes.USER], { ignoreToken: true })
  @Get('/user/school/:id/chances')
  public async userGetChances(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.schoolService.userGetChances(id, req.user?.id);
  }

  @Auth([Scopes.USER], { ignoreToken: true })
  @Get('/user/school/:id')
  public async userDetailSchool(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.schoolService.userDetailSchool(id, req.user?.id);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'name', required: false })
  @Auth([Scopes.ADMIN])
  @Get('/admin/schools')
  public async adminListSchool(@Query() query: any): Promise<any> {
    return await this.schoolService.adminListSchool(query);
  }

  @Auth([Scopes.ADMIN])
  @Post('/admin/school')
  public async adminInsertSchool(@Body() body: InsertSchoolDto): Promise<any> {
    return await this.schoolService.insertSchool(body);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/school/:id')
  public async adminEditSchool(
    @Param('id', IsValidObjectId) id: string,
    @Body() body: UpdateSchoolDto,
  ): Promise<any> {
    return await this.schoolService.updateSchool(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/school/:id')
  public async adminDeleteSchool(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.schoolService.deleteSchool(id);
  }

  // @ApiQuery({
  //   name: 'name',
  //   description: 'major name to search ',
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'page',
  //   description: 'page',
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   description: 'page size',
  //   required: false,
  // })
  // @Get('/majors')
  // public async listMajor(@Query() query: any): Promise<any> {
  //   return await this.schoolService.listMajor(query);
  // }
}

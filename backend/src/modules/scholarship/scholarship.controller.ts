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
import { ApiTags } from '@nestjs/swagger';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipService } from './scholarship.service';
import { Auth } from 'src/decorators/auth.decorate';
import { Scopes } from '@constants/enum';
import { IsValidObjectId } from 'src/pipes/object-id.pipe';

@Controller()
@ApiTags('Scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Auth([Scopes.USER], { ignoreToken: true })
  @Get('/user/scholarships')
  public async userListScholarship(@Query() query: any): Promise<any> {
    return await this.scholarshipService.userListScholarship(query);
  }

  @Auth([Scopes.USER])
  @Get('/user/scholarship/:id')
  public async getUserScholarshipDetail(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.scholarshipService.getUserScholarshipDetail(id);
  }

  @Auth([Scopes.ADMIN])
  @Get('/admin/scholarships')
  public async adminListScholarship(@Query() query: any): Promise<any> {
    return await this.scholarshipService.adminListScholarship(query);
  }

  @Auth([Scopes.ADMIN])
  @Post('/admin/scholarship')
  public async adminCreateScholarship(
    @Body() body: CreateScholarshipDto,
  ): Promise<any> {
    return await this.scholarshipService.createScholarship(body);
  }

  @Patch('/admin/scholarship/:id')
  public async updateScholarship(
    @Param('id') id: string,
    @Body() body: UpdateScholarshipDto,
  ): Promise<any> {
    return await this.scholarshipService.updateScholarship(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/scholarship/:id')
  public async deleteScholarship(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.scholarshipService.deleteScholarship(id);
  }
}

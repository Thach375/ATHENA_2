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
import { IsValidObjectId } from 'src/pipes/object-id.pipe';
import { UpdateBasicInformationDto } from './dto/update-basic-information.dto';
import { UpdateCourseWorkDto } from './dto/update-coursework.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { UpdateDemographicsDto } from './dto/update-demographics.dto';
import { UpdateExtracurricularsDto } from './dto/update-extracurricular.dto';
import { UpdateGradesDto } from './dto/update-grade.dto';
import { ScoresAndCertsDto } from './dto/update-scores-and-certs.dto';
import { UpdateTestScoresDto } from './dto/update-test-score.dto';
import { UpdateUserStateDto } from './dto/update-user-state.dto';
import { UserService } from './user.service';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';
import { UpdateAspirationDto } from './dto/update-aspiration-dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Auth([Scopes.USER])
  // @Patch('/user/password')
  // public async userChangePassword(
  //   @Req() req: any,
  //   @Body() body: ChangePasswordDto,
  // ): Promise<any> {
  //   return await this.userService.changePassword(req.user.id, body);
  // }

  // @Auth([Scopes.USER])
  // @Get('/user/profile')
  // public async userGetProfile(@Req() req: any): Promise<any> {
  //   return await this.userService.userGetProfile(req.user.id);
  // }

  // @Auth([Scopes.USER])
  // @Patch('/user/profile')
  // public async userUpdateProfile(
  //   @Req() req: any,
  //   @Body() body: UserUpdateProfileDto,
  // ): Promise<any> {
  //   return await this.userService.userUpdateProfile(req.user.id, body);
  // }

  @Auth([Scopes.ADMIN])
  @ApiQuery({ name: 'page', description: 'current page', required: false })
  @ApiQuery({ name: 'limit', description: 'page limit', required: false })
  @ApiQuery({ name: 'email', description: 'email', required: false })
  @ApiQuery({
    name: 'sort',
    description:
      'sort fields. format: {key}:{direction}. direction is desc or asc',
    required: false,
  })
  @Get('/admin/users')
  public async adminListUser(@Query() query: any): Promise<any> {
    return await this.userService.adminListUsers(query);
  }

  // @Auth([Scopes.ADMIN])
  // @Get('/admin/user/:id')
  // public async adminDetailUser(
  //   @Param('id', IsValidObjectId) id: string,
  // ): Promise<any> {
  //   return await this.userService.detailUser(id);
  // }

  // @Auth([Scopes.ADMIN])
  // @Post('/admin/user')
  // public async adminCreateUser(@Body() body: CreateUserDto): Promise<any> {
  //   return await this.userService.adminCreateUser(body);
  // }

  // @Auth([Scopes.ADMIN])
  // @Patch('/admin/user/:id')
  // public async adminUpdateUser(
  //   @Param('id', IsValidObjectId) id: string,
  //   @Body() body: UpdateUserDto,
  // ): Promise<any> {
  //   return await this.userService.adminUpdateUser(id, body);
  // }

  @Auth([Scopes.USER])
  @Post('/user/profile/test-scores')
  public async updateTestScores(
    @Req() req: any,
    @Body() body: UpdateTestScoresDto,
  ): Promise<any> {
    return await this.userService.updateTestScores(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/extracurriculars')
  public async updateExtracurriculars(
    @Req() req: any,
    @Body() body: UpdateExtracurricularsDto,
  ): Promise<any> {
    return await this.userService.updateExtracurriculars(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/grades')
  public async updateGrades(
    @Req() req: any,
    @Body() body: UpdateGradesDto,
  ): Promise<any> {
    return await this.userService.updateGradesDto(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/coursework')
  public async updateCoursework(
    @Req() req: any,
    @Body() body: UpdateCourseWorkDto,
  ): Promise<any> {
    return await this.userService.updateCoursework(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/basic-information')
  public async updateBasicInformation(
    @Req() req: any,
    @Body() body: UpdateBasicInformationDto,
  ): Promise<any> {
    return await this.userService.updateBasicInformation(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/scores-and-certs')
  public async updateScoresAndCertificates(
    @Req() req: any,
    @Body() body: ScoresAndCertsDto,
  ): Promise<any> {
    return await this.userService.updateScoresAndCertificates(
      req.user?.id,
      body,
    );
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/experiences')
  public async updateExperiences(
    @Req() req: any,
    @Body() body: UpdateExperiencesDto,
  ): Promise<any> {
    return await this.userService.updateExperiences(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/aspiration')
  public async updateAspiration(
    @Req() req: any,
    @Body() body: UpdateAspirationDto,
  ): Promise<any> {
    return await this.userService.updateAspiration(req.user?.id, body);
  }

  @Auth([Scopes.USER])
  @Post('/user/profile/demographics')
  public async updateDemographics(
    @Req() req: any,
    @Body() body: UpdateDemographicsDto,
  ): Promise<any> {
    return await this.userService.updateDemographics(req.user?.id, body);
  }

  @Get('/user/profile/detail/:id')
  public async getUserProfile(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    const userProfile = await this.userService.userGetProfile(id);
    const schools = await this.userService.getSchoolsInfo(
      userProfile.profile.aspiration.intendedUniversities,
    );
    return {
      userProfile,
      schools,
    };
  }

  @Auth([Scopes.USER])
  @Post('/user/consultation')
  public async userSendConsultation(@Req() req: any): Promise<any> {
    return await this.userService.userSendConsultation(req.user?.id);
  }

  @Auth([Scopes.USER])
  @Get('/user/profile')
  public async userGetProfile(@Req() req: any): Promise<any> {
    return await this.userService.userGetProfile(req.user?.id);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/user/:id/credits')
  public async adminUpdateUserBalance(
    @Param('id', IsValidObjectId) id: string,
    @Body() body: UpdateCreditDto,
  ): Promise<any> {
    return await this.userService.adminUpdateUserBalance(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/user/:id/status')
  public async adminUpdateUserState(
    @Param('id', IsValidObjectId) id: string,
    @Body() body: UpdateUserStateDto,
  ): Promise<any> {
    return await this.userService.adminUpdateUser(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/user/:id')
  public async adminDeleteUser(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.userService.adminDeleteUser(id);
  }
}

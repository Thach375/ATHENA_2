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
import { SaveFounderDto } from './dto/save-founder';
import { UpdateFounderDto } from './dto/update-founder';
import { FounderService } from './founder.service';

@Controller()
@ApiTags('Founder')
export class FounderController {
  constructor(private readonly founderService: FounderService) {}
  @Auth([Scopes.ADMIN])
  @Post('/admin/founder')
  public async adminSaveFounder(@Body() body: SaveFounderDto): Promise<any> {
    return await this.founderService.adminSaveFounder(body);
  }

  @Auth([Scopes.ADMIN])
  @Patch('/admin/founder/:id')
  public async adminUpdateFounder(
    @Param('id', IsValidObjectId) id: string,
    @Body() body: UpdateFounderDto,
  ): Promise<any> {
    return await this.founderService.adminUpdateFounder(id, body);
  }

  @Auth([Scopes.ADMIN])
  @Delete('/admin/founder/:id')
  public async adminDeleteFounder(
    @Param('id', IsValidObjectId) id: string,
  ): Promise<any> {
    return await this.founderService.adminRemoveFounder(id);
  }

  @ApiQuery({ name: 'fullName', description: 'fullName', required: false })
  @ApiQuery({ name: 'page', description: 'page', required: false })
  @ApiQuery({ name: 'limit', description: 'page size', required: false })
  @Get('/founders')
  public async listFounder(
    @Query() query: { fullName?: string; page?: number; limit?: number },
  ): Promise<any> {
    return await this.founderService.listFounder(query);
  }
}

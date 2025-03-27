import { Scopes } from '@constants/enum';
import { Controller, Delete, Get, Param, Query, Req } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Auth } from 'src/decorators/auth.decorate';
import { AdminService } from './admin.service';
import { IsValidObjectId } from 'src/pipes/object-id.pipe';

@Controller('')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/admins')
  @ApiQuery({
    name: 'page',
    description: 'current page. default 1.',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit item per page. default 10.',
    required: false,
  })
  @Auth([Scopes.ADMIN])
  public async listAdmins(@Query() query: any): Promise<any> {
    return this.adminService.listAdmins(query);
  }

  @Delete('/admin/:id')
  @Auth([Scopes.ADMIN])
  public async DeleteAdmin(
    @Req() request: any,
    @Param('id', IsValidObjectId) id: mongoose.Types.ObjectId,
  ): Promise<any> {
    return this.adminService.deleteAdmin(request.user.id, id);
  }
}

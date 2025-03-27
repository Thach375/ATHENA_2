import { CommonResponse, PaginationResult } from '@common/interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.schema';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  public async listAdmins(query: any): Promise<PaginationResult<Admin>> {
    const match = {};
    return await this.adminRepository.listWithPaginate({
      match: match,
      project: { __v: 0, password: 0 },
      lookups: [
        {
          from: 'roles',
          localField: 'roles',
          foreignField: '_id',
          as: 'roles',
        },
      ],
      unwinds: [
        {
          path: '$roles',
          preserveNullAndEmptyArrays: true,
        },
      ],
      page: +query.page,
      limit: +query.limit,
    });
  }

  public async deleteAdmin(
    actor: string,
    id: mongoose.Types.ObjectId,
  ): Promise<CommonResponse> {
    if (actor === id.toString()) {
      throw new BadRequestException(`admin.CAN_NOT_PERFORM_ACTION`);
    }

    const admin = await this.adminRepository.model.findOne({ _id: id }).lean();

    if (!admin) {
      throw new BadRequestException(`admin.NOT_FOUND`);
    }

    if (admin.isRoot) {
      throw new BadRequestException(`admin.CAN_NOT_PERFORM_ACTION`);
    }

    await this.adminRepository.model.deleteOne({ _id: id });

    return { ok: 1 };
  }

  // public async updateRole(
  //   actor: string,
  //   id: string,
  //   roles: string[],
  // ): Promise<CommonResponse> {
  //   if (actor === id) {
  //     throw new BadRequestException(`admin.CAN_NOT_PERFORM_ACTION`);
  //   }

  //   const admin = await this.adminRepository.model.findOne({ _id: id });

  //   if (!admin) {
  //     throw new BadRequestException(`admin.NOT_FOUND`);
  //   }

  //   if (admin.isRoot) {
  //     throw new BadRequestException(`admin.CAN_NOT_PERFORM_ACTION`);
  //   }

  //   const roleDocs = await this.rbacService.listRoleByIds(roles);

  //   if (roleDocs.length !== roles.length) {
  //     throw new BadRequestException(`auth.ROLE.HAVE_INVALID_ROLES`);
  //   }

  //   Object.assign(admin, {
  //     roles: roles.map((role) => new mongoose.Types.ObjectId(role)),
  //   });

  //   await admin.save();

  //   return { ok: 1 };
  // }

  // public async createSubAdmin(
  //   params: CreateSubAdminDto,
  // ): Promise<{ id: string }> {
  //   const adminExists = await this.adminRepository.model.findOne({
  //     email: params.email,
  //   });

  //   if (adminExists) {
  //     throw new BadRequestException(`admin.ALREADY_EXISTS`);
  //   }

  //   const isRolesValid = await this.rbacService.roleCheckByIds(params.roles);

  //   if (!isRolesValid) {
  //     throw new BadRequestException(`auth.ROLE.HAVE_INVALID_ROLES`);
  //   }

  //   Object.assign(params, {
  //     password: await StringUtils.encryptPassword(params.password),
  //     roles: params.roles.map((r) => new mongoose.Types.ObjectId(r)),
  //   });

  //   const adminDocs = await this.adminRepository.model.create(params);

  //   return { id: adminDocs._id.toString() };
  // }

  // public async isRoot(id: string): Promise<boolean> {
  //   const numRoot = await this.adminRepository.model.countDocuments({
  //     _id: id,
  //     isRoot: true,
  //   });

  //   if (numRoot) return true;

  //   return false;
  // }

  public async findOneById(id: string): Promise<Admin> {
    const user = await this.adminRepository.model.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException(`admin.NOT_FOUND`);
    }

    return user;
  }

  public async findOneByEmail(email: string): Promise<Admin> {
    const user = await this.adminRepository.model.findOne({ email: email });

    if (!user) {
      throw new BadRequestException(`admin.NOT_FOUND`);
    }

    return user;
  }

  public async createOne(user: Admin): Promise<string> {
    const isExists = await this.isExists(user.email);

    if (isExists) {
      throw new BadRequestException(`admin.ALREADY_EXISTS`);
    }

    const userDocs = await this.adminRepository.model.create(user);

    await userDocs.save();

    return userDocs._id.toString();
  }

  public async isExists(email: string): Promise<boolean> {
    const numExists = await this.adminRepository.model
      .countDocuments({ email: email })
      .lean();

    if (numExists) {
      return true;
    }

    return false;
  }
}

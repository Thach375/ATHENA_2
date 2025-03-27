import { BadRequestException, Injectable } from '@nestjs/common';
import { MentorRepository } from './mentor.repository';
import { InsertMentorDto } from './dto/insert-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { PaginationResult } from '@common/interface';
import { Mentor } from './mentor.schema';
import { InsertMentorCalendarDto } from './dto/insert-mentor-calendar.dto';
import { MentorCalendarRepository } from './mentor-calendar/mentor-calendar.repository';
import mongoose from 'mongoose';
import { UpdateMentorCalendarDto } from './dto/update-mentor-calendar.dto';
import { SchedulerStatus } from '@constants/enum';

@Injectable()
export class MentorService {
  constructor(
    private readonly mentorRepository: MentorRepository,
    private readonly mentorCalendarRepository: MentorCalendarRepository,
  ) {}

  public async adminDeleteCalendar(id: string): Promise<void> {
    const calendar = await this.mentorCalendarRepository.model.findOne({
      _id: id,
    });

    if (!calendar) {
      throw new BadRequestException(`calendar not found.`);
    }

    await this.mentorCalendarRepository.model.deleteOne({ _id: id });
  }

  public async adminUpdateCalendar(
    calendarId: string,
    body: UpdateMentorCalendarDto,
  ): Promise<void> {
    const calendar = await this.mentorCalendarRepository.model.findOne({
      _id: calendarId,
    });

    if (!calendar) {
      throw new BadRequestException(`calendar not found.`);
    }

    const existsCalendar =
      await this.mentorCalendarRepository.model.countDocuments({
        $or: [
          {
            $and: [
              { startDate: { $gte: body.startDate, $lte: body.endDate } },
              { _id: { $ne: calendarId } },
            ],
          },
          {
            $and: [
              { endDate: { $gte: body.startDate, $lte: body.endDate } },
              { _id: { $ne: calendarId } },
            ],
          },
        ],
      });

    if (existsCalendar) {
      throw new BadRequestException(`invalid time period`);
    }

    for (const key of Object.keys(body)) {
      calendar[key] = body[key];
    }

    await calendar.save();
  }

  public async adminInsertCalendar(
    mentorId: string,
    body: InsertMentorCalendarDto,
  ): Promise<{ id: mongoose.Types.ObjectId }> {
    const existsCalendar = await this.mentorCalendarRepository.model.find({
      mentor: new mongoose.Types.ObjectId(mentorId),
      status: { $nin: [SchedulerStatus.CANCELLED, SchedulerStatus.ENDED] },
      $or: [
        {
          $and: [{ startDate: { $gte: body.startDate, $lte: body.endDate } }],
        },
        {
          $and: [{ endDate: { $gte: body.startDate, $lte: body.endDate } }],
        },
      ],
    });

    console.log(existsCalendar);

    if (existsCalendar) {
      throw new BadRequestException(`invalid time period`);
    }

    const mentorCalendar = await this.mentorCalendarRepository.model.create({
      mentor: new mongoose.Types.ObjectId(mentorId),
      endDate: body.endDate,
      startDate: body.startDate,
      user: body.userId && new mongoose.Types.ObjectId(body.userId),
    });

    await mentorCalendar.save();

    return { id: mentorCalendar._id };
  }

  public async adminInsertMentor(params: InsertMentorDto): Promise<void> {
    const mentor = await this.mentorRepository.model.create(params);
    await mentor.save();
  }

  public async adminUpdateMentor(
    id: string,
    params: UpdateMentorDto,
  ): Promise<void> {
    const mentorDocs = await this.mentorRepository.model.findOne({ _id: id });

    if (!mentorDocs) {
      throw new BadRequestException('mentor.NOT_FOUND');
    }

    Object.assign(mentorDocs, params);

    console.log(mentorDocs);

    await mentorDocs.save();
  }

  public async adminRemoveMentor(id: string): Promise<void> {
    const mentorDocs = await this.mentorRepository.model.findOne({ _id: id });

    if (!mentorDocs) {
      throw new BadRequestException('mentor.NOT_FOUND');
    }

    await this.mentorRepository.model.deleteOne({ _id: id });
  }

  public async adminListMentor(query: any): Promise<PaginationResult<Mentor>> {
    const conditions = {};

    if (query.name) {
      Object.assign(conditions, {
        name: {
          $regex: new RegExp(`${query.name?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    const result = await this.mentorRepository.listWithPaginate({
      match: conditions,
      limit: query.limit,
      page: query.page,
    });

    for (const d of result.data) {
      const calendars = await this.mentorCalendarRepository.model.find({
        mentor: new mongoose.Types.ObjectId((d as any)._id),
        endDate: { $gte: new Date() },
      });

      Object.assign(d, { calendars: calendars });
    }

    return result;
  }

  public async userListMentor(query: any): Promise<PaginationResult<Mentor>> {
    const conditions = {};
    const projection = {
      _id: 1,
      name: 1,
      avatar: 1,
      social: 1,
      about: 1,
      majors: 1,
      skills: 1,
      position: 1,
      school: 1,
      agency: 1,
    };

    if (query.name) {
      Object.assign(conditions, {
        name: {
          $regex: new RegExp(`${query.name?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    if (query.major) {
      Object.assign(conditions, {
        majors: {
          $regex: new RegExp(`${query.major?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    if (query.mentorIds) {
      Object.assign(conditions, { _id: { $in: query.mentorIds } });
    }

    return await this.mentorRepository.listWithPaginate({
      match: conditions,
      project: projection,
      limit: query.limit,
      page: query.page,
    });
  }

  public async userDetailMentor(id: string): Promise<Mentor> {
    const mentorDocs = await this.mentorRepository.model
      .findOne({ _id: id })
      .lean();

    if (!mentorDocs) {
      throw new BadRequestException(`mentor.NOT_FOUND`);
    }

    const calendars = await this.mentorCalendarRepository.model.find(
      {
        mentor: new mongoose.Types.ObjectId(mentorDocs._id),
        endDate: { $gte: new Date() },
        status: { $nin: [SchedulerStatus.CANCELLED, SchedulerStatus.ENDED] },
      },
      { startDate: 1, endDate: 1, status: 1 },
    );

    Object.assign(mentorDocs, { calendars: calendars });

    return mentorDocs;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Document } from 'mongoose';
import { GoogleMeetService } from 'src/external-services/google-meet/google-meet.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { SchedulerRepository } from './scheduler.repository';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Pricing, SchedulerStatus } from '@constants/enum';
import { PaginationResult } from '@common/interface';
import { Scheduler } from './scheduler.schema';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';
import { MailerService } from '@modules/mailer/mailer.service';
import { SchedulerProfile } from './scheduler-profile/scheduler-profile.schema';
import { MentorService } from '@modules/mentor/mentor.service';
import { SchedulerProfileRepository } from './scheduler-profile/scheduler-profile.repository';
import { Mentor } from '@modules/mentor/mentor.schema';
import { AppObject } from '@constants/object';
import StringUtils from 'src/utils/string.util';
import { AppConfig } from 'src/configs';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class SchedulerService {
  constructor(
    private readonly googleMeetService: GoogleMeetService,
    private readonly schedulerRepository: SchedulerRepository,
    private readonly schedulerProfileRepository: SchedulerProfileRepository,
    private readonly userService: UserService,
    private readonly mentorService: MentorService,
    private readonly mailerService: MailerService,
    private readonly appConfig: AppConfig,
  ) {}

  public async adminApproveScheduler(id: string): Promise<void> {
    const scheduler = await this.schedulerRepository.model.findOne({ _id: id });

    if (!scheduler) {
      throw new BadRequestException(`scheduler not found.`);
    }

    const user = await this.userService.findOneById(
      scheduler.userId.toString(),
    );

    const mentor = await this.mentorService.userDetailMentor(
      scheduler.mentorId.toString(),
    );

    // const { uri } = await this.createMeetSession({
    //   scheduler: scheduler._id.toString(),
    //   startTime: +scheduler.requestStartTime,
    //   endTime: +scheduler.requestEndTime,
    // });

    scheduler.status = SchedulerStatus.SCHEDULED;

    await scheduler.save();

    await this.mailerService.sendEmails({
      options: {
        to: user.email,
        subject: AppObject.EMAIL_TEMPLATES.PAYMENT_SUCCESS.SUBJECT,
      },
      template: {
        data: {
          mentorName: mentor.name,
          dateStr: dayjs(scheduler.requestStartTime)
            .tz('Asia/Phnom_Penh')
            .format('DD-MM-YYYY'),
          startTimeStr: dayjs(scheduler.requestStartTime)
            .tz('Asia/Phnom_Penh')
            .format('HH:mm:ss'),
          endTimeStr: dayjs(scheduler.requestEndTime)
            .tz('Asia/Phnom_Penh')
            .format('HH:mm:ss'),
          meetLink: scheduler.googleMeetUri,
        },
        name: AppObject.EMAIL_TEMPLATES.PAYMENT_SUCCESS.TEMPLATE,
      },
    });
  }

  public async adminCancelScheduler(id: string): Promise<void> {
    const scheduler = await this.schedulerRepository.model.findOne({
      _id: id,
    });

    if (!scheduler) {
      throw new BadRequestException(`scheduler not found.`);
    }

    const user = await this.userService.findOneById(
      scheduler.userId.toString(),
    );

    const mentor = await this.mentorService.userDetailMentor(
      scheduler.mentorId.toString(),
    );

    // if (scheduler.mentorCalendar) {
    //   await this.mentorService.adminDeleteCalendar(
    //     scheduler.mentorCalendar.toString(),
    //   );
    // }

    scheduler.status = SchedulerStatus.CANCELLED;

    await scheduler.save();

    await this.mailerService.sendEmails({
      options: {
        to: user.email,
        subject: AppObject.EMAIL_TEMPLATES.PAYMENT_FAILED.SUBJECT,
      },
      template: {
        data: {
          mentorName: mentor.name,
          dateStr: dayjs(scheduler.requestStartTime)
            .tz('Asia/Phnom_Penh')
            .format('DD-MM-YYYY'),
          startTimeStr: dayjs(scheduler.requestStartTime)
            .tz('Asia/Phnom_Penh')
            .format('HH:mm:ss'),
          endTimeStr: dayjs(scheduler.requestEndTime)
            .tz('Asia/Phnom_Penh')
            .format('HH:mm:ss'),
        },
        name: AppObject.EMAIL_TEMPLATES.PAYMENT_FAILED.TEMPLATE,
      },
    });
  }

  public async userListBookedMentors(
    userId: string,
    query: any,
  ): Promise<PaginationResult<Mentor>> {
    const schedulerHistory = await this.schedulerRepository.model
      .find({
        userId: new mongoose.Types.ObjectId(userId),
      })
      .sort({ createdAt: -1 });

    const mapMentorPriority = new Map<string, number>();

    schedulerHistory.forEach((history) => {
      if (!mapMentorPriority.get(history.mentorId.toString())) {
        mapMentorPriority.set(
          history.mentorId.toString(),
          Number((history as any).createdAt),
        );
      }
    });

    const mentorIds = new Set<mongoose.Types.ObjectId>();
    schedulerHistory.forEach((history) => {
      mentorIds.add(history.mentorId);
    });

    const result = await this.mentorService.userListMentor({
      ...query,
      mentorIds: Array.from(mentorIds),
    });

    result.data = result.data.sort((cur: any, next: any) => {
      return (
        mapMentorPriority.get(next._id.toString()) -
        mapMentorPriority.get(cur._id.toString())
      );
    });

    return result;
  }

  public async userGetSchedulerHistory(
    userId: string,
    mentorId: string,
  ): Promise<Scheduler[]> {
    const schedulers = await this.schedulerRepository.model
      .find({
        userId: new mongoose.Types.ObjectId(userId),
        mentorId: new mongoose.Types.ObjectId(mentorId),
      })
      .populate({ path: 'schedulerProfile' })
      .sort({ createdAt: -1 });

    return schedulers;
  }

  public async adminListSchedulers(
    query: any,
  ): Promise<PaginationResult<Scheduler>> {
    const match = {};

    if (query.userEmail) {
      Object.assign(match, {
        mentee: {
          email: { $regex: new RegExp(query.userEmail), $options: 'i' },
        },
      });
    }

    if (query.status) {
      Object.assign(match, { status: query.status });
    }

    if (query.requestStartTime) {
      Object.assign(match, {
        requestStartTime: { $gte: new Date(Number(query.requestStartTime)) },
      });
    }

    if (query.requestEndTime) {
      Object.assign(match, {
        requestEndTime: { $gte: new Date(Number(query.requestEndTime)) },
      });
    }

    const result = await this.schedulerRepository.listWithPaginate({
      match: match,
      page: query.page,
      limit: query.limit,
      sort: { createdAt: -1 },
      lookups: [
        {
          localField: 'mentorId',
          foreignField: '_id',
          as: 'mentor',
          from: 'mentors',
        },
        {
          localField: 'userId',
          foreignField: '_id',
          as: 'mentee',
          from: 'users',
        },
      ],
      unwinds: [
        {
          path: '$mentor',
          preserveNullAndEmptyArrays: true,
        },
        {
          path: '$mentee',
          preserveNullAndEmptyArrays: true,
        },
      ],
    });

    return result;
  }

  public async controlMeeting(): Promise<void> {
    const schedulers = await this.schedulerRepository.model.find({
      status: { $in: [SchedulerStatus.PENDING, SchedulerStatus.GOING_ON] },
      googleMeetSpace: { $exists: 1 },
    });

    for (const scheduler of schedulers) {
      const user = await this.userService.findOneById(
        scheduler.userId.toString(),
      );
      const conferences = await this.googleMeetService.searchConference(
        scheduler.googleMeetSpace,
      );

      if (!conferences?.length) {
        continue;
      } else {
        conferences.sort((current, next) => {
          return (
            Number(current.startTime.seconds) - Number(next.startTime.seconds)
          );
        });
        let actualStartTime = null;
        for (const conference of conferences) {
          const participants = await this.googleMeetService.searchParticipants(
            conference.name,
          );

          if (participants.length >= 2) {
            if (scheduler.status === SchedulerStatus.PENDING) {
              scheduler.status = SchedulerStatus.GOING_ON;
              await scheduler.save();
            }
            actualStartTime = new Date(
              Number(conference.startTime.seconds) * 1000,
            );
          }
        }

        if (
          scheduler.actualStartTime &&
          scheduler.status !== SchedulerStatus.ENDED
        ) {
          if (
            Date.now() - Number(scheduler.actualStartTime) >=
            2 * 60 * 60 * 1000
          ) {
            user.credits =
              user.credits -
              (Number(scheduler.actualEndTime) -
                Number(scheduler.actualStartTime)) /
                60000;
            await user.save();
            scheduler.status = SchedulerStatus.ENDED;
            this.mailerService.sendEmails({
              options: {
                to: user.email,
                subject: 'Athena survey',
              },
              template: {
                data: {
                  link: 'https://support.google.com/surveys/answer/2372144?hl=en',
                },
                name: 'meet-rate.ejs',
              },
            });
            await this.googleMeetService.endActiveConference(
              scheduler.googleMeetSpace,
            );
            await scheduler.save();
            continue;
          }
        }

        if (!scheduler.actualStartTime && actualStartTime) {
          scheduler.actualStartTime = actualStartTime;
        }

        const isMeetFreeze =
          conferences.every((conferences) => conferences.endTime?.seconds) &&
          scheduler.actualStartTime;

        if (
          scheduler.actualStartTime &&
          (Date.now() - Number(scheduler.actualStartTime)) / 60000 >
            user.credits
        ) {
          scheduler.status = SchedulerStatus.ENDED;
          scheduler.actualEndTime = new Date();
          user.credits = 0;
          await user.save();
          this.mailerService.sendEmails({
            options: {
              to: user.email,
              subject: 'Athena survey',
            },
            template: {
              data: {
                link: 'https://support.google.com/surveys/answer/2372144?hl=en',
              },
              name: 'meet-rate.ejs',
            },
          });
          try {
            await this.googleMeetService.endActiveConference(
              scheduler.googleMeetSpace,
            );
          } finally {
            await scheduler.save();
          }
          continue;
        }

        if (isMeetFreeze) {
          let lastEndTime = 0;

          for (const conference of conferences) {
            if (lastEndTime < +conference.endTime?.seconds * 1000) {
              lastEndTime = +conference.endTime?.seconds * 1000;
            }
          }
          if (scheduler.lastFreezeTime) {
            if (
              Date.now() - (Number(scheduler.lastFreezeTime) || 0) >=
              10 * 60 * 1000
            ) {
              scheduler.status = SchedulerStatus.ENDED;
              scheduler.actualEndTime = new Date(lastEndTime);
              this.mailerService.sendEmails({
                options: {
                  to: user.email,
                  subject: 'Athena survey',
                },
                template: {
                  data: {
                    link: 'https://support.google.com/surveys/answer/2372144?hl=en',
                  },
                  name: 'meet-rate.ejs',
                },
              });
              if (scheduler.actualStartTime) {
                user.credits =
                  user.credits -
                  (Number(scheduler.actualEndTime) -
                    Number(scheduler.actualStartTime)) /
                    60000;

                await user.save();
              }
              try {
                await this.googleMeetService.endActiveConference(
                  scheduler.googleMeetSpace,
                );
              } finally {
                await scheduler.save();
              }
              continue;
            }
          } else {
            scheduler.lastFreezeTime = new Date();
          }
        } else {
          scheduler.lastFreezeTime = null;
        }
      }

      await scheduler.save();
    }
  }

  public async createMeetSession(
    body: CreateMeetingDto,
  ): Promise<{ uri: string }> {
    const scheduler = await this.schedulerRepository.model
      .findOne({
        _id: body.scheduler,
      })
      .populate({ path: 'mentorId' })
      .populate({ path: 'userId' });

    if (!scheduler) {
      throw new BadRequestException(`scheduler.NOT_FOUND`);
    }

    if ((scheduler.userId as unknown as User).credits <= 0) {
      throw new BadRequestException(`user.NOT_ENOUGH_CREDITS`);
    }

    const space = await this.googleMeetService.createMeetSpace();

    Object.assign(scheduler, {
      googleMeetUri: space.uri,
      googleMeetSpace: space.name,
      userCredits: (scheduler.userId as any).credits || 0,
    });

    const calendar = await this.googleMeetService.createCalendar({
      endTime: new Date(+body.endTime),
      startTime: new Date(+body.startTime),
      meetUri: space.uri,
      mentee: (scheduler.userId as any).email,
      mentor: (scheduler.mentorId as any).email,
    });

    Object.assign(scheduler, { calendarUri: calendar.calendarUri });

    await scheduler.save();

    await this.adminApproveScheduler(scheduler._id.toString());

    return { uri: space.uri };
  }

  // Create booking request
  public async createScheduler(
    userId: string,
    body: CreateSchedulerDto,
  ): Promise<any> {
    const user = await this.userService.findOneById(userId);
    const mentor = await this.mentorService.userDetailMentor(body.mentorId);

    if (!user) {
      throw new BadRequestException(`User not found.`);
    }

    if (!mentor) {
      throw new BadRequestException(`Mentor is not available.`);
    }

    const existsScheduler = await this.schedulerRepository.model.findOne({
      mentorId: new mongoose.Types.ObjectId(body.mentorId),
      status: { $nin: [SchedulerStatus.CANCELLED, SchedulerStatus.ENDED] },
      $or: [
        {
          $and: [
            { requestStartTime: { $gte: body.startTime, $lte: body.endTime } },
          ],
        },
        {
          $and: [
            { requestEndTime: { $gte: body.startTime, $lte: body.endTime } },
          ],
        },
      ],
    });

    if (existsScheduler) {
      if (userId === existsScheduler.userId.toString()) {
        throw new BadRequestException(
          `You have already booked this mentor for this time`,
        );
      } else {
        throw new BadRequestException(
          `This mentor has an appointment scheduled for this time`,
        );
      }
    }

    // let mentorCalendar;

    // try {
    //   mentorCalendar = await this.mentorService.adminInsertCalendar(
    //     body.mentorId,
    //     {
    //       endDate: body.endTime,
    //       startDate: body.startTime,
    //       userId: userId,
    //     },
    //   );
    // } catch (err) {
    //   throw new BadRequestException(
    //     `This mentor has an appointment scheduled for this time`,
    //   );
    // }

    if (user.pricingPlan !== body.pricingPlan) {
      this.sendPaymentForm(user, mentor, body);
    }

    const schedulerProfile = await this.createSchedulerProfile(userId, body);

    const schedulerParams = {
      userId: new mongoose.Types.ObjectId(userId),
      mentorId: new mongoose.Types.ObjectId(body.mentorId),
      requestEndTime: body.endTime,
      userCredits: user.credits,
      requestStartTime: body.startTime,
      schedulerProfile: schedulerProfile?._id,
      //mentorCalendar: mentorCalendar,
    };

    const schedulerDoc = await this.schedulerRepository.model.create(
      schedulerParams,
    );

    await schedulerDoc.save();
    return { ok: 1 };
  }

  public async sendPaymentForm(
    user: Document & User,
    mentor: Mentor,
    body: CreateSchedulerDto,
  ): Promise<void> {
    if (!user.paymentCode) {
      user.paymentCode = await StringUtils.randomString(8, false).toUpperCase();
      await user.save();
    }

    const response = await fetch(
      'https://api.getgeoapi.com/v2/currency/convert?api_key=fc3af19fff76c73e4df2143a6d72073913f57e00',
    );

    const rates = ((await response.json()) as any)?.rates;

    const rate = Math.floor(rates.VND.rate / rates.USD.rate);

    const payLink = `https://img.vietqr.io/image/${
      this.appConfig.appEnv.PAYMENT.BANK_CODE
    }-${
      this.appConfig.appEnv.PAYMENT.BANK_NO
    }-compact-2.jpg?amount=${Math.floor(
      rate * Pricing[body.pricingPlan],
    )}&addInfo=${user.paymentCode}`;

    try {
      await this.mailerService.sendEmails({
        options: {
          to: user.email,
          subject: AppObject.EMAIL_TEMPLATES.PURCHASE.SUBJECT,
        },
        template: {
          data: {
            mentorName: mentor.name,
            dateStr: dayjs(body.startTime)
              .tz('Asia/Phnom_Penh')
              .format('DD-MM-YYYY'),
            startTimeStr: dayjs(body.startTime)
              .tz('Asia/Phnom_Penh')
              .format('HH:mm:ss'),
            endTimeStr: dayjs(body.endTime)
              .tz('Asia/Phnom_Penh')
              .format('HH:mm:ss'),
            amount: Pricing[body.pricingPlan],
            paymentLink: payLink,
          },
          name: AppObject.EMAIL_TEMPLATES.PURCHASE.TEMPLATE,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async createSchedulerProfile(
    userId: string,
    body: CreateSchedulerDto,
  ): Promise<SchedulerProfile & { _id: mongoose.Types.ObjectId }> {
    const schedulerProfileParams = {
      mentorId: new mongoose.Types.ObjectId(body.mentorId),
      userId: new mongoose.Types.ObjectId(userId),
      additionInfo: body.additionInfo,
      concernCriteria: body.concernCriteria,
      curriculumVitae: body.concernCriteria,
      frequency: body.frequency,
      primaryGoals: body.primaryGoals,
      pricingPlan: body.pricingPlan,
    } as SchedulerProfile;

    const schedulerProfile = await this.schedulerProfileRepository.model.create(
      schedulerProfileParams,
    );

    await schedulerProfile.save();

    return schedulerProfile;
  }
}

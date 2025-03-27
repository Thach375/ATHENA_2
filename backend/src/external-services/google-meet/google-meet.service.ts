import { AppObject } from '@constants/object';
import { v2 } from '@google-apps/meet';
import { google } from '@google-apps/meet/build/protos/protos';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleMeetOptions } from './google-meet.interface';
import { calendar_v3 } from '@googleapis/calendar';

@Injectable()
export class GoogleMeetService {
  private calendarClient: calendar_v3.Calendar;
  private auth: OAuth2Client;
  private meetClient: v2.SpacesServiceClient;
  private conferenceClient: v2.ConferenceRecordsServiceClient;

  constructor(
    @Inject(AppObject.APP_PROVIDERS.GOOGLE_MEET)
    private readonly options: GoogleMeetOptions,
  ) {
    this.registerOAuth2();
  }

  public async searchParticipants(
    conferenceName: string,
  ): Promise<google.apps.meet.v2.IParticipant[]> {
    const participants = await this.conferenceClient.listParticipants({
      parent: conferenceName,
    });

    return participants?.[0];
  }

  public async searchConference(
    spaceName: string,
  ): Promise<google.apps.meet.v2.IConferenceRecord[]> {
    const conferences = await this.conferenceClient.listConferenceRecords(
      {
        filter: `space.name = "${spaceName}"`,
      },
      { maxRetries: 5 },
    );

    return conferences?.[0];
  }

  public async createCalendar(params: {
    mentor: string;
    mentee: string;
    meetUri: string;
    startTime: Date;
    endTime: Date;
  }): Promise<{ calendarUri: string }> {
    try {
      const result = await this.calendarClient.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: {
          summary: `Meeting with Athena's mentor`,
          start: {
            dateTime: params.startTime.toISOString(),
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: params.endTime.toISOString(),
            timeZone: 'America/Los_Angeles',
          },
          visibility: 'private',
          attendees: [
            { email: params.mentee, displayName: params.mentee, self: false },
            {
              email: params.mentor,
              displayName: params.mentor,
              self: false,
            },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
          conferenceData: {
            entryPoints: [
              {
                entryPointType: 'video',
                uri: params.meetUri,
                label: params.meetUri.split('https://').pop(),
              },
            ],
            conferenceSolution: {
              key: { type: 'hangoutsMeet' },
              name: 'Google Meet',
              iconUri:
                'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png',
            },
            conferenceId: params.meetUri.split('/').pop(),
          },
        },
      });

      return { calendarUri: result.data?.htmlLink || '' };
    } catch (err) {
      throw new BadRequestException(`calendar.CREATE_CALENDAR_ERROR`);
    }
  }

  public async endActiveConference(space: string): Promise<void> {
    try {
      await this.meetClient.endActiveConference({ name: space });
    } catch (err) {}
  }

  public async runtest(): Promise<any> {
    try {
      const results = await this.conferenceClient.listConferenceRecords({
        filter: 'space.name = "spaces/YL23pfP6DWUB"',
      });

      for (const r of results[0] || []) {
        const participant = await this.conferenceClient.listParticipants({
          parent: r.name,
        });

        const participants = [];
        for (const p of participant[0]) {
          participants.push(p);
        }
        Object.assign(r, { p: participants });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getConference(name: string): Promise<any> {
    const conferenceRecords = await this.conferenceClient.getConferenceRecord({
      name: name,
    });

    console.log(conferenceRecords);

    return conferenceRecords?.[0];
  }

  async getMeetSpace(name: string): Promise<any> {
    const space = await this.meetClient.getSpace({ name: name });
    return space?.[0];
  }

  async createMeetSpace(): Promise<{ uri: string; name: string }> {
    try {
      const result = await this.meetClient.createSpace({
        space: {
          config: {
            accessType: 'OPEN',
            entryPointAccess: 'ALL',
          },
        },
      } as google.apps.meet.v2.CreateSpaceRequest);

      return {
        uri: result[0].meetingUri,
        name: result[0].name,
      };
    } catch (err) {
      return null;
    }
  }

  async registerOAuth2(): Promise<void> {
    this.auth = new OAuth2Client({
      clientId: this.options.clientId,
      clientSecret: this.options.clientSecret,
    });

    await this.auth.setCredentials({
      refresh_token: this.options.refreshToken,
    });

    this.meetClient = new v2.SpacesServiceClient({
      authClient: this.auth as any,
    });

    this.conferenceClient = new v2.ConferenceRecordsServiceClient({
      authClient: this.auth as any,
    });

    this.calendarClient = new calendar_v3.Calendar({ auth: this.auth });
  }
}

import { AppObject } from '@constants/object';
import { Inject, Injectable } from '@nestjs/common';
import { OpenAiOptions } from './open-ai.interface';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openAi: OpenAI;

  constructor(
    @Inject(AppObject.APP_PROVIDERS.OPEN_AI)
    private readonly options: OpenAiOptions,
  ) {
    this.register();
  }

  public async requestChances(
    schools: { name: string; id: string }[],
    profile: any,
  ): Promise<string> {
    profile = {
      scoresAndCerts: profile.scoresAndCerts,
      experiences: profile.experiences,
    };
    const instructions = `${JSON.stringify(profile).trim()} chances to ${schools
      .map((school) => `{ id: ${school.id}, name: ${school.name}}`)
      .join(';')}`;

    console.log(instructions);

    const run = await this.openAi.beta.threads.createAndRunPoll({
      assistant_id: 'asst_TD7uucGYMyHBhp1R8lBly3mo',
      thread: {
        messages: [
          {
            role: 'user',
            content: instructions,
          },
        ],
      },
    });

    const messages = await this.openAi.beta.threads.messages.list(
      run.thread_id,
      { run_id: run.id },
    );

    return (messages.data[0]?.content?.[0] as any)?.text?.value?.toLowerCase();
  }

  public async register() {
    this.openAi = new OpenAI({ apiKey: this.options.apiKey });
  }
}

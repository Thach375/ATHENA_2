import { AppObject } from '@constants/object';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './school.schema';
import { SchoolRepository } from './school.repository';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MajorSchema } from './major/major.schema';
import { MajorRepository } from './major/major.repository';
import { ChancesPropRepository } from './chances-properties/chances-properties.repository';
import { ChancesPropertySchema } from './chances-properties/chances-properties.schema';
import { OpenAiModule } from 'src/external-services/open-ai/open-ai.module';
import { AppConfig, AppConfigModule } from 'src/configs';
import { ChanceLogModule } from '@modules/chance-logs/chance-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.SCHOOL, schema: SchoolSchema },
      { name: AppObject.COLLECTIONS.MAJOR, schema: MajorSchema },
      {
        name: AppObject.COLLECTIONS.CHANCES_PROPERTY,
        schema: ChancesPropertySchema,
      },
    ]),
    OpenAiModule.registerAsync({
      useFactory: (appConfig: AppConfig) => {
        return appConfig.getOpenAiConfig();
      },
      imports: [AppConfigModule],
      inject: [AppConfig],
    }),
    ChanceLogModule,
  ],
  providers: [
    SchoolRepository,
    MajorRepository,
    SchoolService,
    ChancesPropRepository,
  ],
  controllers: [SchoolController],
  exports: [SchoolService],
})
export class SchoolModule {}

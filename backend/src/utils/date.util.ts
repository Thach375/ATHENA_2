import * as dayjs from 'dayjs';

export class DateUtils {
  static toDatabaseDateString(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}

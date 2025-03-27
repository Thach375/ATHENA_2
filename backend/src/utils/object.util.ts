import { keys } from 'ts-transformer-keys';
export class ObjectUtils {
  static omit(keys: string[], obj) {
    if (!keys.length) return obj;
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { [keys.pop()]: ommited, ...rest } = obj;
    return this.omit(keys, rest);
  }

  static getInterfaceKeys(interfaceObject: any) {
    return keys<typeof interfaceObject>();
  }

  static getSorts(input: string): object {
    const result = {};
    const sortParts = input.split(';');
    for (const part of sortParts) {
      const sort = part.split(':');
      if (sort?.[1]?.toLowerCase() === 'desc') {
        Object.assign(result, { [sort[0]]: -1 });
      }
      if (sort?.[1]?.toLowerCase() === 'asc') {
        Object.assign(result, { [sort[0]]: 1 });
      }
    }

    return result;
  }
}

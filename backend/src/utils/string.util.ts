import * as bcrypt from 'bcrypt';
export default class StringUtils {
  static formatTextSearch(text: string): string {
    return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  static randomNumberString(length): string {
    const number = '0123456789';
    let numberStr = '';
    for (let i = 0; i < length; i++) {
      numberStr += number[Math.floor(Math.random() * 100) % number.length];
    }
    return numberStr;
  }

  static randomString(length = 6, isSymbol = false): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const special = '#$@!%&*?';
    let all = uppercase + lowercase + number;
    if (isSymbol) {
      all += special;
    }
    function characterRandom(str: string): string {
      const num = Math.floor(Math.random() * 100) % str.length;
      return str[num];
    }
    const password =
      characterRandom(uppercase) +
      characterRandom(lowercase) +
      characterRandom(number + special) +
      Array(length - 3)
        .fill(0)
        .map(() => characterRandom(all))
        .join('');
    return [...password].sort(() => Math.random() - 0.5).join('');
  }

  static formatPhoneNumber(phone: string): string {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }

  static capitalizeString(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static escapeSpecialCharacters(input: string): string {
    return input.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
  }

  static async encryptPassword(pwd: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(pwd, salt);
  }

  static async comparePassword(rawText: string, pwd: string): Promise<boolean> {
    return await bcrypt.compareSync(rawText, pwd);
  }
}

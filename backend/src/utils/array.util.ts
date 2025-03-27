export class ArrayUtils {
  static compare(a: any[], b: any[]): boolean {
    return (
      a.length === b.length && a.every((element, index) => element === b[index])
    );
  }
}

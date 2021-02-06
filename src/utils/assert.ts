/** value가 undefined나 null이 아님을 단언한다 */
export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error('assertion error: value is either undefined or null');
  }
}

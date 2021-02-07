/** enum 객체의 길이를 반환한다 */
export function getEnumLength(
  enumObject: Record<string, string | number>
): number {
  return Object.keys(enumObject).filter((key) => isNaN(Number(key))).length;
}

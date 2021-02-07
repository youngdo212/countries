export interface Country {
  id: string;
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

/** api.ts 유틸에서 사용되는 반환값 */
export interface APIResult<T> {
  isSuccess: boolean;
  data: T | null;
  errorMessage: string;
}

/**********************
 * 유틸 타입
 **********************/

/** saga의 call effect에 사용된 함수가 Promise를 반환할 경우 Promise의 resolved된 타입을 반환한다 */
export type CallReturnType<
  T extends (...args: unknown[]) => unknown
> = ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>;

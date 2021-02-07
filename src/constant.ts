/** country 리스트의 첫 번째 페이지 넘버 */
export const INITIAL_PAGE = 1;

/** 한 번에 표시할 country 리스트 개수 */
export const COUNTRY_LIMIT = 60;

/** country를 정렬하는 순서 */
export enum SortOrder {
  Default,
  ASC,
  DESC,
}

/** 정렬 순서 텍스트 맵핑 객체 */
export const SORT_ORDER_TEXT: { [key in SortOrder]: string } = {
  [SortOrder.Default]: '',
  [SortOrder.ASC]: '(오름차순)',
  [SortOrder.DESC]: '(내림차순)',
};

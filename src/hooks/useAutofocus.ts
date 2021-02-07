import * as React from 'react';

const { useEffect } = React;

/** input 엘리먼트를 자동 포커싱 한다 */
export default function useAutofocus(
  inputRef: React.RefObject<HTMLInputElement>
): void {
  useEffect(() => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.focus();
    }
  }, [inputRef]);
}

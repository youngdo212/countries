import * as React from 'react';
import styled from 'styled-components';
import { assertIsDefined } from '../utils/assert';

const { useEffect, useRef } = React;

interface ScrollLoaderProps {
  /** 스크롤이 끝에 도달했을 때 호출할 함수 */
  onLoad: () => void;
}

/** 스크롤이 끝에 도달했을 때 콜백 함수를 호출하는 컴포넌트 */
const ScrollLoader = ({ onLoad }: ScrollLoaderProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = getIntersectionObserver(onLoad);
    const WrapperEl = wrapperRef.current;

    assertIsDefined(WrapperEl);

    observer.observe(WrapperEl);

    return () => observer.unobserve(WrapperEl);
  }, [onLoad]);

  return <ScrollLoaderWrapper ref={wrapperRef} onClick={onLoad} />;
};

/** Intersection Observer에 handler를 추가해서 반환한다 */
function getIntersectionObserver(
  handler: (...args: unknown[]) => unknown
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        handler();
      }
    });
  });
}

const ScrollLoaderWrapper = styled.div`
  height: 30px;
`;

export default ScrollLoader;

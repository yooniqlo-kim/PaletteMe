import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 전환 시 스크롤을 최상단으로 이동시키는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableElement = document.querySelector('#scrollable-container');
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;

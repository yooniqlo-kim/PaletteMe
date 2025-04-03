import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollableElement = document.querySelector('#scrollable-container');
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.key]); // ✅ key가 바뀌면 실행됨

  return null;
};

export default ScrollToTop;

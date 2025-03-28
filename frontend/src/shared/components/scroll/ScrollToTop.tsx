import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

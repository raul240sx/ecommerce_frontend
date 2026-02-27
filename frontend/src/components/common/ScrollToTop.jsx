import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { handleScrollToTop } from '../../utils/ScrollUtils';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    handleScrollToTop();

  }, [pathname]);

  return null;

}

export default ScrollToTop;
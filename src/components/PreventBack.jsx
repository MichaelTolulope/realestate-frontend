import { useEffect } from 'react';

const PreventBack = () => {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return null;
};

export default PreventBack;

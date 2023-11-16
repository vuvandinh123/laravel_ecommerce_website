import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'VVD - NFTs';
    }
  }, [title]);
};

export default useDocumentTitle;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDefault } from '../../contexts/DefaultContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { setProductLoad, scrollPosition, filter, setFilter } = useDefault()
  const [lastPath, setLastPath] = useState('')

  useEffect(() => {
    if (pathname.includes('/main/cloth')) {
      window.scrollTo(scrollPosition, 0)
    } else {
      window.scrollTo(0, 0);
    }
    if ((!pathname.includes('/main/cloth') && !pathname.includes('/product')) || (lastPath.includes('/main/cloth') && pathname.includes('/main/cloth'))) {
      setProductLoad(10)
    }
    setLastPath(pathname)
  }, [pathname]);// de fiecare data cand pagina se schimba, se da scroll in varful pagini

  return null;
}
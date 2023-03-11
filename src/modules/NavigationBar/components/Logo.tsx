import { useLocation } from 'react-router-dom';

import styles from '../styles.module.css';

function Logo() {
  const push:any = useLocation();

  return <div className={styles.navigationBarLogo} onClick={() => push('/')} />;
}

export default Logo;

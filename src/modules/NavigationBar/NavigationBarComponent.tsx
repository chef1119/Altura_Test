import React from 'react';
import Logo from './components/Logo';
import NavigationLinks from './components/NavigationLinks';

import styles from './styles.module.css';

function NavigationBarComponent() {
  return (
    <div className={styles.navigationBarRoot}>
      <div className={styles.navigationLinkPart}>
        <Logo />
        <NavigationLinks />
      </div>
    </div>
  );
}

export default NavigationBarComponent;

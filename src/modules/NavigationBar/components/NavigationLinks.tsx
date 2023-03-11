import React from 'react';
import { MainPaths } from '../../../lib/navdata';
import NavigationLink from './NavigationLink';

import styles from '../styles.module.css';

function NavigationLinksComponent() {
  return (
    <div className={styles.navigationLinksContainer}>
      {MainPaths.map((path) => (
        <NavigationLink key={path.label} route={path} />
      ))}
    </div>
  );
}

export default NavigationLinksComponent;

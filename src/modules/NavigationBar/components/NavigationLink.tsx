import React from 'react';
import { TMainPath } from '../../../types/pathTypes';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from '../styles.module.css';

type Props = {
  route: TMainPath;
};

function NavigationLink({ route }: Props) {
  const { pathname: basicPathname } = useLocation();
  const pathname = basicPathname === '/' ? '/nft_mint' : basicPathname;

  return (
    <NavLink to={route.link} className={clsx(styles.navigationLink, pathname === route.link ? styles.active : '')}>
      {route.label}
    </NavLink>
  );
}

export default React.memo(NavigationLink);

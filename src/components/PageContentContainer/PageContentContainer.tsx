import React, { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode | ReactNode[];
};

function PageContentContainer({ children }: Props) {
  return <div className={styles.pageContentRoot}>{children}</div>;
}

export default React.memo<Props>(PageContentContainer);

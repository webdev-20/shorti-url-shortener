import styles from './ContentLayout.module.css';

const ContentLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContentLayout;

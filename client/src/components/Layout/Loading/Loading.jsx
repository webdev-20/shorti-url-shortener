import { Rings } from 'react-loader-spinner';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.container}>
      <Rings height="200" width="200" />
    </div>
  );
};

export default Loading;

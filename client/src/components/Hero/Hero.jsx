import classes from './Hero.module.css';
import UrlForm from '../UrlForm/UrlForm.jsx';
import useAuth from '../../hooks/useAuth.js';

function Hero() {
  const { auth } = useAuth();
  return (
    <>
      <div className={classes.container}>
        {
          //!auth?.user &&
          <>
            <div className={classes.sloganTop}>Making Sharing</div>
            <div className={classes.sloganBottom}>Easy &nbsp;&nbsp; Beautiful</div>
            <span className={classes.and}>&</span>
            <hr className={classes.lineOne}></hr>
            <hr className={classes.lineTwo}></hr>
            <hr className={classes.lineThree}></hr>
            <hr className={classes.lineFour}></hr>
            <hr className={classes.lineFive}></hr>
            <span className={classes.creationImg}>
              <img src="/images/undraw_creation_re_d1mi 1.png" height={457} />
            </span>
          </>
        }
        <UrlForm />
      </div>
    </>
  );
}

export default Hero;

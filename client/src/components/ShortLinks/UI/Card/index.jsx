import classes from './Card.module.css';

const Card = ({ children }) => {
  return <article className={classes.card}>{children}</article>;
};

export default Card;

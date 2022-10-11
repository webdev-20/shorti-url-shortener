import CopyIcon from './../../../assets/copy-icon.svg';
import classes from './CopyBtn.module.css';

export default function CopyBtn({ icon = true, text = true, dataAttId }) {
  return (
    <button className={classes.copyBtn}>
      {icon ? <img src={CopyIcon} height="20px" width="20px" alt="copy icon" /> : ''}
      {text ? 'Copy' : ''}
    </button>
  );
}

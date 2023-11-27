import CopyIcon from '../../../../assets/copy-icon.svg';
import classes from './CopyBtn.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import toast from 'react-hot-toast';

export default function CopyBtn({ icon = true, text = true, shortCode }) {
  return (
    <CopyToClipboard text={`${import.meta.env.VITE_FRONTEND_URL}/${shortCode}`}>
      <button className={classes.copyBtn} onClick={() => toast('Short link copied!')}>
        {icon ? <img src={CopyIcon} height="20px" width="20px" alt="copy icon" /> : ''}
        {text ? 'Copy' : ''}
      </button>
    </CopyToClipboard>
  );
}

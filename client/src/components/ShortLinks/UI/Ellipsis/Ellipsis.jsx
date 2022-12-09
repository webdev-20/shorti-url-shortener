import classes from './Ellipsis.module.css';

export default function Ellipsis({ addlClasses, ...args }) {
  return (
    <div className={`${classes.ellipsis} ${addlClasses ? addlClasses.join(' ') : ''}`} {...args}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

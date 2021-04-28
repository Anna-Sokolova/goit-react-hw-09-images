import styles from './ButtonClose.module.css';

const Button = ({ onClose }) => (
  <button
    type="button"
    data-action="close-lightbox"
    className={styles.closeButton}
    onClick={onClose}
  ></button>
);

export default Button;
